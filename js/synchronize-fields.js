'use strict';
(function () {
  window.synchronizeFields = function (firstField, secondField, firstValues, secondValues, callback) {
    var fieldValue = firstField.value;
    var index = firstValues.indexOf(fieldValue);

    if (typeof callback === 'function') {
      callback(secondField, secondValues[index]);
    }
  };
})();
