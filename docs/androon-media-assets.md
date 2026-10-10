# Galiyan Pindi Diyan — high-resolution project panels

The project page uses the first two canvases from the 26 MB PDF uploaded on October 10,
2026, as 24 contiguous full-width panels. Each panel has a 1537px responsive version
and a 3074px HD version. Larger displays and the image viewer use the HD files.
The Canva embed and alternate readable layout are removed.

The uploaded PDF contained 34 missing image bindings in paint patterns, which
caused paragraphs to disappear in both MuPDF and Poppler. The corresponding
patterns from the earlier export were used to restore those bindings for the
rendering copy. The latest PDF's higher-resolution graphics remain in use.
Uploaded files were not modified.

Media can be added later, one section at a time. Supply an original MP4 or GIF
and identify its section/position with a screenshot. These names identify the
current panels:

- `canvas-1-01` through `canvas-1-20`: introduction through game flow.
- `canvas-2-01` through `canvas-2-04`: environment design, details, VR experience,
  and rickshaw.
The final six prototype slides, beginning with “Begin journey”, were removed
from the page at the user’s request. Their files remain available for future use.

Use H.264 MP4 for video; specify whether each clip should loop silently or use
playback controls. Provide a poster image or identify the still to retain. A PDF
alone contains no playable GIF/video data. Replacing a region inside a panel may
require a clean still/background or a re-export with that region removed.

## Added introduction video

The VR experience panel (`canvas-2-03`) now plays `assets/videos/intro-vr.mp4`
in its existing video area. The supplied Drive video was encoded as a 1080p
H.264/AAC MP4 with fast-start metadata. It starts muted, plays inline when visible,
and pauses when scrolled out of view. Native controls and a separate Unmute/Mute
button allow visitors to control playback and audio.

## Video 02 and player updates

The rickshaw panel (`canvas-2-04`) now plays `assets/videos/rickshaw-tour.mp4`
inside the existing yellow frame. Both videos autoplay muted when visible,
pause offscreen, and have independent unmute/mute buttons and native controls.
Both players use `controlslist="nodownload"` to hide the browser download option.
The decorative VR glasses graphic was removed from the introduction video slide;
the actor's headset remains part of the supplied video footage.

## Looping videos and animated drivers

Both videos loop while visible and start muted. The three driver GIFs are served
as transparent animated WebP files, preserving their 40 ms frames and infinite
loop while reducing download sizes. The three large static portraits were
removed as PDF image objects before rendering a clean driver background from
the earlier export. Decorative frames, small turnaround views and text remain.
The animated portraits scale with the panel and open individually in the viewer.

## Project overview glasses motion

The overview panel uses a background rendered with the original headset image
object removed, plus the transparent headset extracted from the PDF. The headset
rotates from -10 to +10 degrees around its center in a 20-second continuous cycle.
The same layered animation appears in the enlarged viewer. Visitors requesting
reduced motion see a stationary headset. Position and size scale with the slide.
