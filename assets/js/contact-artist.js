(() => {
  const video = document.querySelector('#contact-artist-video');
  const canvas = document.querySelector('.connect__artist-canvas');
  if (!video || !canvas) return;
  // The MP4 contains original RGB on the left and its synchronized matte on
  // the right. One decoder keeps the animation and opacity perfectly aligned.
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false });
  let render;
  if (gl) {
    const compile = (type, source) => {
      const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 position; varying vec2 uv; void main(){ uv=(position+1.0)*0.5; gl_Position=vec4(position,0.0,1.0); }'));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, 'precision mediump float; varying vec2 uv; uniform sampler2D frame; void main(){ vec3 color=texture2D(frame,vec2(uv.x*0.5,uv.y)).rgb; float alpha=texture2D(frame,vec2(0.5+uv.x*0.5,uv.y)).r; gl_FragColor=vec4(color,alpha); }'));
    gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    render = () => { gl.viewport(0, 0, canvas.width, canvas.height); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
  } else {
    // Software fallback for devices with WebGL disabled.
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width; maskCanvas.height = canvas.height;
    const mask = maskCanvas.getContext('2d', { willReadFrequently: true });
    render = () => {
      const w = canvas.width, h = canvas.height;
      context.clearRect(0, 0, w, h); context.drawImage(video, 0, 0, w, h, 0, 0, w, h);
      mask.drawImage(video, w, 0, w, h, 0, 0, w, h);
      const matte = mask.getImageData(0, 0, w, h);
      for (let i = 0; i < matte.data.length; i += 4) matte.data[i + 3] = matte.data[i];
      mask.putImageData(matte, 0, 0);
      context.globalCompositeOperation = 'destination-in'; context.drawImage(maskCanvas, 0, 0);
      context.globalCompositeOperation = 'source-over';
    };
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, callback = null;
  const paint = () => { if (video.readyState >= 2) render(); };
  const cancel = () => {
    if (callback === null) return;
    if ('cancelVideoFrameCallback' in video) video.cancelVideoFrameCallback(callback);
    else cancelAnimationFrame(callback);
    callback = null;
  };
  const tick = () => { callback = null; if (reduced.matches || !visible || document.hidden) video.pause(); paint(); if (visible && !reduced.matches && !video.paused) schedule(); };
  const schedule = () => {
    if (callback !== null) return;
    callback = 'requestVideoFrameCallback' in video ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick);
  };
  const update = () => {
    if (visible && !reduced.matches && !document.hidden) video.play().catch(paint);
    else { video.pause(); cancel(); paint(); }
  };
  video.addEventListener('loadeddata', paint);
  video.addEventListener('playing', () => { if (!visible || reduced.matches || document.hidden) video.pause(); else schedule(); });
  video.addEventListener('seeked', paint);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .1 }).observe(canvas);
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
})();
