'use strict';
(function () {
  var syncValues = function (element, value) {
    element.value = value;
  };
  var synchronizeFields = function (firstField, secondField, firstValues, secondValues, callback) {
    firstField.value = firstValues.indexOf();
    firstValues.indexOf() = secondValues
  };

  window.synchronizeFields(checkinTime, checkoutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };


})();
