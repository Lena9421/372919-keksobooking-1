'use strict';
(function () {
  var Y_MIN = 150;
  var Y_MAX = 500;
  var X_MIN = 0;
  var X_MAX = 1200;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');


  var pageActivated = false;
  var pins = [];
  var allOffers;

  var PinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    ARROW_HEIGHT: 18
  };
  var pinOffset = PinSize.HEIGHT / 2 + PinSize.ARROW_HEIGHT;


  var insertElement = function (element) {
    map.insertBefore(element, filtersContainer);
  };

  var onDataSuccessLoad = function (response) {
    allOffers = response;
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };
  window.backend.getData(onDataSuccessLoad, window.backend.onError);


  var addPinsToMap = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (elem) {
      var pin = window.pin.generate(elem);
      pins.push(pin);
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };


  var resetMainPin = function () {
    mainPin.style = '';
    window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop + pinOffset);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    addPinsToMap(allOffers);
  };

  var removePins = function () {
    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  var deactivateMap = function () {
    pageActivated = false;
    map.classList.add('map--faded');
    removePins();
    pins = [];
    resetMainPin();
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var pinCoords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    };
    var onMouseMove = function (moveEvt) {
      if (!pageActivated) {
        pageActivated = true;
        activateMap();
        window.form.activate();
      }

      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinCoords.x = mainPin.offsetLeft - shift.x;
      pinCoords.y = mainPin.offsetTop - shift.y;

      if ((pinCoords.y + pinOffset < Y_MIN) || (pinCoords.y + pinOffset > Y_MAX)) {
        pinCoords.y = mainPin.offsetTop;
      }
      if ((pinCoords.x < X_MIN) || (pinCoords.x > X_MAX)) {
        pinCoords.x = mainPin.offsetLeft;
      }

      mainPin.style.left = pinCoords.x + 'px';
      mainPin.style.top = pinCoords.y + 'px';

      window.form.setAddress(pinCoords.x, pinCoords.y + pinOffset);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!pageActivated) {
        pageActivated = true;
        activateMap();
        window.form.activate();
      }
      window.form.setAddress(pinCoords.x, pinCoords.y + pinOffset);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  window.map = {
    insertElement: insertElement,
    deactivate: deactivateMap
  };
})();
