'use strict';

(function () {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin');
  var activePin = document.querySelector('.map__pin--active');

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

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var onPinClick = function (evt, offer) {
    deactivatePin();
    evt.currentTarget.classList.add('map__pin--active');
    window.card.show(offer);
  };

  window.pin = {
    generate: generatePin,
    deactivate: deactivatePin
  };

})();
