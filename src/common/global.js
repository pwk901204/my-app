import FastClick from 'fastclick';
import url from 'api_url/index.js';
import wxShare from "./wxShare";

//全局变量
Object.defineProperties(global, {
  url: { value: url },
  wx: { value: window.wx }
});

//微信分享
wxShare();

function isPassive() {
  var supportsPassiveOption = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassiveOption = true;
        }
      })
    );
  } catch (e) {}
  return supportsPassiveOption;
}

document.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  isPassive()
    ? {
        capture: false,
        passive: false
      }
    : false
);

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});
