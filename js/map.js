'use strict';
(function () {
  var OFFERS_COUNT = 8;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');

  var getOffersArray = function (arrayLength) {
    var offersArray = [];
    for (var i = 0; i < arrayLength; i++) {
      offersArray[i] = window.data.generateOffer(i);
    }
    return offersArray;
  };
  var allOffers = getOffersArray(OFFERS_COUNT);

  // var addPinsToMap = function (array) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < array.length; i++) {
  //     fragment.appendChild(window.pin.generate(allOffers[i]));
  //   }
  //   mapPins.appendChild(fragment);
  // };



  var onMainPinMouseUp = function () {
    map.classList.remove('map--faded');
    // addPinsToMap(allOffers);

    window.upLoad(function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.pin.generate(allOffers[i]));
      }
      mapPins.appendChild(fragment);
    });
      // onError);

    window.form.activate();
  };
  var filtersContainer = document.querySelector('.map__filters-container');

  var insertElement = function (element) {
    map.insertBefore(element, filtersContainer);
  };

  var Y_MIN = 100;
  var Y_MAX = 500;
  var X_MIN = 100;
  var X_MAX = 700;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var finalX = mainPin.offsetLeft - shift.x;
      var finalY = mainPin.offsetTop - shift.y;
      var formX;
      var formY;
      if (finalY <= Y_MIN) {
        mainPin.style.top = Y_MIN + 'px';
        formY = Y_MIN;
      } else if (finalY >= Y_MAX) {
        mainPin.style.top = Y_MAX + 'px';
        formY = Y_MAX;
      } else {
        mainPin.style.top = finalY + 'px';
        formY = finalY;
      }
      if (finalX <= X_MIN) {
        mainPin.style.left = X_MIN + 'px';
        formX = X_MIN;
      } else if (finalX >= X_MAX) {
        mainPin.style.left = X_MAX + 'px';
        formX = X_MAX;
      } else {
        mainPin.style.left = finalX + 'px';
        formX = finalX;
      }
      mainPin.style.left = finalX + 'px';
      setAddress(formX, formY);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  var setAddress = function (x, y) {
    window.form.addressField.value = (x - 32) + ', ' + (y - 100);
  };
  mainPin.addEventListener('mouseup', onMainPinMouseUp);
  window.map = {
    insertElement: insertElement
  };
})();
