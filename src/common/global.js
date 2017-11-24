import FastClick from 'fastclick';
import url from 'api_url/index.js';

import HOCFetch from "common/HOCFetch";

//WebSocket connect url
let webSocketUrl = '';
if (window.location.host === 'localhost:3000') {
  webSocketUrl = 'ws://192.168.0.104:3000/cable';
} else if (window.location.host === 'localhost:4000') {
  webSocketUrl = 'ws://' + window.location.host + '/cable';
} else {
  webSocketUrl = 'wss://' + window.location.host + '/cable';
}
webSocketUrl = 'wss://doctor.mdsonline.cn/cable';

//全局变量
Object.defineProperties(global, {
  url: { value: url },
  wx: { value: window.wx },
  iscrollOptions: {
    value: { preventDefault: false }
  },
  webSocketUrl: {
    value: webSocketUrl
  },
  HOCFetch:{
    value:HOCFetch
  }
});

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

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
