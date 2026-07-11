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

## Video frames (`video-frame.webp`, `vt1–vt3.webp`)

Frames extracted from
["Dashcam Recording (urban)"](<https://commons.wikimedia.org/wiki/File:Dashcam_Recording_(urban).ogv>)
by Fernost, Wikimedia Commons, **CC0 1.0** (public domain dedication).
`video-frame.webp` is the frame at 73s (OSD strips cropped); the tracking
boxes in the video mockup follow the vehicles actually visible in the clip.

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
