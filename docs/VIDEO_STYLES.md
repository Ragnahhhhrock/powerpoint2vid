# Video styles

The **Video style** setting applies a preset look and motion to the exported video. Each preset adapts the art direction from community prompts in [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT) to the in-browser canvas renderer. The prompts and videos belong to their creators; we borrow the direction, not the text.

Presets live in `js/video-styles.js`; the effects (motion, camera, frame, captions, grain, vignette, misregistration, HUD, underline) are in `js/renderer.js`.

| Style | What it does | Adapted from |
|---|---|---|
| Clean | Full-bleed slides, shapes fade up (original behaviour) | — |
| Minimal cinematic | Slow push-in, blur-in reveals, vignette, light grain, lower-third captions | [@cipherwrk](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/cipherwrk-451155.md) |
| Keynote launch | Slide as a rounded card on a dark stage, slow drifting camera, glass captions | [@thejohnnyhuy](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/thejohnnyhuy-282154.md), [@jake11moran](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/jake11moran-414633.md) |
| UI springs | Warm-gray canvas, closed-form springs with a tiny overshoot, short blur, camera settles in | [@twoclipping](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/twoclipping-402193.md), [@verbove](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/verbove-268381.md) |
| Kinetic poster | Hard cuts, shapes slam in from below, magenta/acid-green misregistration on impact, mono HUD labels | [@techhalla](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/techhalla-498547.md) |
| Paper & ink | Slide pinned to paper, film grain, 8fps "boil", hand-drawn title underline, typewriter-tape captions | [@stokebuilder](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/stokebuilder-356793.md), [@superalesha](https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/superalesha-970412.md) |

## Adding a style
Add an entry to `STYLES` in `js/video-styles.js`:
- `motion`: `fade-up`, `spring`, `slam`, `blur`
- `camera`: `none`, `push`, `drift`, `settle`
- `frame`: `bg`, optional `glow`, `card` (inset), `radius`, `shadow`, `tilt`
- `caption`: `box`, `cinematic`, `glass`, `ui`, `kinetic`, `tape`
- `fx`: `grain`, `vignette`, `misreg`, `hud`, `boil`, `underline`
- `trans`: default transition, and `sources` for credit
