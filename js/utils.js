'use strict';
(function () {
  var getRandomElement = function (array) {
    return Math.floor(Math.random() * (array.length));
  };

  var getRandomInteger = function (min, max) {
    return (Math.random() * (max - min)) + min;
  };
  var getRandomLengthArray = function (arr, arraylength) {
    var ArrayWithRandomLength = [];
    var arrcopy = arr.slice();
    for (var i = 0; i < arraylength; i++) {
      ArrayWithRandomLength[i] = arrcopy.splice(getRandomElement(arrcopy), 1) + '';
    }
    return ArrayWithRandomLength;
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomInteger: getRandomInteger,
    getArrayWithRandomLength: getRandomLengthArray
  };

})();
