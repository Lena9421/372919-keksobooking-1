'use strict';

(function () {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');

  var generatePin = function (offer) {
    var newPin = mapPin.cloneNode(true);
    newPin.style.left = offer.location.x + 'px';
    newPin.style.top = offer.location.y + 'px';
    newPin.querySelector('img').src = offer.author.avatar;
    newPin.addEventListener('click', function (evt) {
      onPinClick(evt, offer);
    });
    return newPin;
  };

  var onPinClick = function (evt, offer) {
    removeActiveClass();
    evt.currentTarget.classList.add('map__pin--active');
    window.showCard.show(offer);
  };

  var removeActiveClass = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var removePin = function () {
    var pin = document.querySelectorAll('button.map__pin');
    for (var i = 0; i < 10; i++) {
      pin.remove();
    }
  };

  window.pin = {
    generate: generatePin,
    deactivate: removeActiveClass,
    remove: removePin
  };

})();
