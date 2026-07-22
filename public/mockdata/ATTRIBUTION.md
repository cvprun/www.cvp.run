# Mock data attribution

The media under `/mockdata/` is real data from openly licensed datasets, used
in the product mockups on this site.

## Images (`street-hero.webp`, `gallery/g01–g12.webp`)

From the [Open Images](https://storage.googleapis.com/openimages/web/index.html)
V6 validation split. Images are licensed **CC BY 2.0** by their photographers;
bounding-box annotations are CC BY 4.0 by Google LLC. The boxes drawn in the
image-editor mockup are the dataset's actual annotations for
`c7b1e6f7c38fa1a0`.

| File                          | Open Images ID   | Author                          |
| ----------------------------- | ---------------- | ------------------------------- |
| street-hero.webp, gallery/g01 | c7b1e6f7c38fa1a0 | iwona_kellie                    |
| gallery/g02                   | 5e0a138b32ed3dbf | Tony Alter                      |
| gallery/g03                   | 6325cc0d75ab233e | André Gustavo Stumpf            |
| gallery/g04                   | 4a23eee283f294b6 | Aubrey Morandarte               |
| gallery/g05                   | af0af3702109e372 | David McKay                     |
| gallery/g06                   | 30e6f3ca1da64271 | Aubrey Morandarte               |
| gallery/g07                   | b2d323f23f9490bd | Highways England                |
| gallery/g08                   | 9e98e64ded3c0518 | fouad JM فواد                   |
| gallery/g09                   | 706f5e98438a2a4a | Municipal Archives of Trondheim |
| gallery/g10                   | f20ad0993878c427 | homer----simpson                |
| gallery/g11                   | ed3c4d467ffab88f | Chris                           |
| gallery/g12                   | 063e2d10b024ca26 | mancbranch                      |

## Review & QA frame (`coco-pickup.webp`)

Image `000000148719` from the [COCO](https://cocodataset.org) 2017 validation
split — ["1970 Dodge Dude"](https://www.flickr.com/photos/daveseven/4781344883/)
by dave_7, **CC BY 2.0** (COCO license id 4). COCO's own annotations are
**CC BY 4.0** by the COCO Consortium.

The boxes in the review mockup are that image's real annotations (five trucks
and one person), offset into a 640×400 crop. COCO labels only the person at
the far left, so the man visible through the windshield really is unlabeled —
that is what the open review thread points at.

## Video labeling frame (`davis-crossing.webp`)

Frame 30 of the `crossing` sequence from the
[DAVIS 2017](https://davischallenge.org/davis2017/code.html) challenge
(semi-supervised, 480p TrainVal). The annotations belong to the challenge
organizers and are licensed **CC BY 4.0**; cite Pont-Tuset et al., _The 2017
DAVIS Challenge on Video Object Segmentation_, arXiv:1704.00675.

The polygons in the video-timeline mockup are the dataset's own pixel-accurate
instance masks (two pedestrians and a truck), contour-traced and simplified.
The clip is 52 frames at 24 fps, 854×480 — the frame counter, timecode, and
track ranges in the mockup are the clip's real numbers.

## Video library thumbnails (`vt1–vt3.webp`)

Frames extracted from
["Dashcam Recording (urban)"](<https://commons.wikimedia.org/wiki/File:Dashcam_Recording_(urban).ogv>)
by Fernost, Wikimedia Commons, **CC0 1.0** (public domain dedication).

## Point cloud (`pandaset-points.bin`, `pandaset-meta.json`)

LiDAR sweep from [PandaSet](https://pandaset.org) by Hesai & Scale AI
(**CC0 / free for commercial use**; mirrored on Hugging Face as
`georghess/pandaset`, CC BY 4.0) — sequence 001, frame 40, downsampled to
60,000 points. Per-point semantic labels and the cuboids in the 3D-editor
mockup are the dataset's real annotations.

`pandaset-points.bin` layout: 60,000 × 8-byte records
(`int16 x, y, z` at 0.01 m, `uint8 intensity`, `uint8 class index` into
`pandaset-meta.json` → `classes`), little-endian, ego-centered coordinates
(x right, y forward, z up).
