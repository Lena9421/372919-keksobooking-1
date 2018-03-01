'use strict';
(function () {
  var MAX_PINS_COUNT = 5;

  var Y_MIN = 150;
  var Y_MAX = 500;
  var X_MIN = 0;
  var X_MAX = 1200;

  var PinSizes = {
    WIDTH: 62,
    HEIGHT: 62,
    ARROW_HEIGHT: 18
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var filtersContainer = document.querySelector('.map__filters-container');

  var pageActivated = false;
  var pins = [];
  var allOffers;

  var pinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var pinOffset = PinSizes.HEIGHT / 2 + PinSizes.ARROW_HEIGHT;

  var insertElement = function (element) {
    map.insertBefore(element, filtersContainer);
  };

  var onDataSuccessLoad = function (response) {
    allOffers = response;
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  var addPinsToMap = function (array) {
    var fragment = document.createDocumentFragment();

    var pinsData = array.slice(0,MAX_PINS_COUNT);

    pinsData.forEach(function (element) {
      var pin = window.pin.generate(element);
      pins.push(pin);
      fragment.appendChild(pin);
    });

    mapPins.appendChild(fragment);
  };

  var onFilterChange = function () {
    window.debounce(function () {
      var filteredData = window.filter.apply(allOffers);

      window.card.remove();
      removePins();
      addPinsToMap(filteredData);
    });
  };

  var resetMainPin = function () {
    mainPin.style = '';
    window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop + pinOffset);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    addPinsToMap(allOffers);
    window.filter.element.addEventListener('change', onFilterChange);
  };

  var removePins = function () {
    if (pins) {
      pins.forEach(function (pin) {
        mapPins.removeChild(pin);
      });

      pins = [];
    }
  };

  var deactivateMap = function () {
    pageActivated = false;
    map.classList.add('map--faded');

    removePins();
    resetMainPin();

    window.filter.element.removeEventListener('change', onFilterChange);
    window.filter.reset();
  };

  var activatePage = function () {
    if (!pageActivated) {
      pageActivated = true;
      activateMap();
      window.form.activate();
    }
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    pinCoords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop
    };

    var onMouseMove = function (moveEvt) {
      activatePage();

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

      activatePage();

      window.form.setAddress(pinCoords.x, pinCoords.y + pinOffset);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.form.setAddress(pinCoords.x, pinCoords.y + pinOffset);
  window.backend.getData(onDataSuccessLoad, window.backend.onError);

  window.map = {
    insertElement: insertElement,
    deactivate: deactivateMap
  };
})();
