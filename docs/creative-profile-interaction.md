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

The contact section uses a 720 × 1280 canvas, matching the original video
resolution. An offline foreground mask (U2NetP with color-key refinement near
the silhouette, connected-background removal, and edge spill correction) is
packed beside the RGB frames into contact-artist-matted.mp4. WebGL samples
the color and mask from the same decoded frame and composites the transparent
character; a Canvas 2D fallback handles devices without WebGL. The MP4 itself
has a synchronized grayscale matte rather than an alpha-channel codec.
The source video and generated intermediate original remain unchanged.

The silent video loops while visible, pauses offscreen, and shows a still frame
for reduced-motion preferences. Both homepage character sections have no bottom
padding, and the profile character moves below the text columns on phones so it
still meets the section boundary. The design-approach section uses a 68ch paragraph
with additional heading separation and smaller top padding.

The contact animation is now enclosed in the approved arched bronze window.
Two curved frame borders surround a clipped dark interior, hiding the rectangular
video bounds. CSS gradients create the bronze bevel without image assets. The
frame scales with the character and its base stays flush with the section bottom.
