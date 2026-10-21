/* Video style presets. Each one adapts the art direction of a community prompt from
   github.com/yihui-dev/awesome-opus5-5-videos (MIT) to the slide renderer.
   Prompts belong to their creators; see docs/VIDEO_STYLES.md for credits. */
(function (global) {
  'use strict';
  const REPO = 'https://github.com/yihui-dev/awesome-opus5-5-videos/blob/main/prompts/';
  const src = (author, slug) => ({ author: '@' + author, post: 'https://x.com/' + author, prompt: REPO + slug + '.md' });

  const STYLES = [
    {
      id: 'clean', name: 'Clean', desc: 'Full-bleed slides, shapes fade up one by one.',
      trans: 'fade', motion: 'fade-up', frame: { bg: '#000' }, camera: 'none', caption: 'box', fx: {}, sources: []
    },
    {
      id: 'cinematic', name: 'Minimal cinematic', desc: 'Slow push-in, soft blur reveals, vignette and light film grain.',
      trans: 'fade', motion: 'blur', frame: { bg: '#000' }, camera: 'push', caption: 'cinematic',
      fx: { vignette: 0.3, grain: 0.06 }, sources: [src('cipherwrk', 'cipherwrk-451155')]
    },
    {
      id: 'keynote', name: 'Keynote launch', desc: 'Slides float as glass cards on a dark stage with a slow drifting camera.',
      trans: 'zoom', motion: 'blur', frame: { bg: '#050507', glow: '#231a52', card: 0.075, radius: 0.028, shadow: 0.6 }, camera: 'drift', caption: 'glass',
      fx: {}, sources: [src('thejohnnyhuy', 'thejohnnyhuy-282154'), src('jake11moran', 'jake11moran-414633')]
    },
    {
      id: 'ui-springs', name: 'UI springs', desc: 'Warm-gray canvas, springy reveals with a tiny overshoot, camera eases in.',
      trans: 'slide', motion: 'spring', frame: { bg: '#e8e6e1', card: 0.06, radius: 0.022, shadow: 0.18 }, camera: 'settle', caption: 'ui',
      fx: {}, sources: [src('twoclipping', 'twoclipping-402193'), src('verbove', 'verbove-268381')]
    },
    {
      id: 'kinetic', name: 'Kinetic poster', desc: 'Hard cuts, shapes slam in from below with print misregistration and mono labels.',
      trans: 'none', motion: 'slam', frame: { bg: '#0a0a0a' }, camera: 'none', caption: 'kinetic',
      fx: { misreg: ['#ff2bd6', '#b8ff00'], hud: '#b8ff00', grain: 0.05 }, sources: [src('techhalla', 'techhalla-498547')]
    },
    {
      id: 'paper', name: 'Paper & ink', desc: 'Slides pinned to paper, hand-drawn title underline, typewriter-tape captions.',
      trans: 'fade', motion: 'fade-up', frame: { bg: '#ece5d6', card: 0.06, radius: 0, shadow: 0.25, tilt: -0.5 }, camera: 'none', caption: 'tape',
      fx: { grain: 0.12, boil: true, underline: '#c8371f' }, sources: [src('stokebuilder', 'stokebuilder-356793'), src('superalesha', 'superalesha-970412')]
    }
  ];

  const byId = {};
  STYLES.forEach((s) => (byId[s.id] = s));
  global.VideoStyles = { list: STYLES, get: (id) => byId[id] || STYLES[0] };
})(window);
