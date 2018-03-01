'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var timeoutId;

  window.debounce = function (callback) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
