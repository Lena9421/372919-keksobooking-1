'use strict';
(function () {
  // Функция выбирающая случайный элемент из массива
  var getRandomElement = function (array) {
    return Math.floor(Math.random() * (array.length));
  };
  // Функция выбирающая случайное число в заданном диапозоне
  var getRandomInteger = function (min, max) {
    return (Math.random() * (max - min)) + min;
  };
  // создадим функцию для генерации массива случайной длины
  var getArrayWithRandomLength = function (arr, arraylength) {
    var ArrayWithRandomLength = [];
    var arrcopy = arr.slice();
    for (var i = 0; i < arraylength; i++) {
      //  приравняем массив к выражению, в котором используется метод splice по отношению
      // к копии масива, при чем, каждый раз вырезается рандомный элемент
      ArrayWithRandomLength[i] = arrcopy.splice(getRandomElement(arrcopy), 1) + '';
    }
    return ArrayWithRandomLength;
  };
  window.utils = {
    getRandomElement: getRandomElement,
    getRandomInteger: getRandomInteger,
    getArrayWithRandomLength: getArrayWithRandomLength
  };
})();
