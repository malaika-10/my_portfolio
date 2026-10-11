# Homepage creative profile

The section immediately after the hero follows the supplied education/experience
and software-skills layout. On phones the character appears above two text columns.

The supplied illustration was adapted with image generation into a transparent
base with clean eye whites. SVG iris/pupil layers sit above the base and are clipped
to the eye openings. Pointer coordinates drive the pupils directly with smoothed,
bounded movement; this is a 2D illustration interaction, not a video or 3D head rig.
The original uploaded MP4 remains unchanged; a copy is used in the contact section.

The tracking button was removed at the user’s request. Reduced-motion preferences
keep tracking stationary. Pointer exit/window blur return the eyes to the center.
Only requestAnimationFrame updates while movement is settling; no continuous loop
runs after the pupils reach their target. The text is real HTML and remains readable
without JavaScript.

The contact section displays the uploaded MP4 through a transparent canvas.
An olive-green color key and edge spill correction remove its backdrop at playback
time; no alpha channel is claimed in the source MP4. The silent video loops while
visible, pauses offscreen, and shows a still frame for reduced-motion preferences.
