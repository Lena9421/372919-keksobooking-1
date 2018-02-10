'use strict';
(function () {
  var map = document.querySelector('.map');

  var offerType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var getFeatureElement = function (featureElement) {
    var liFragment = document.createDocumentFragment();
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + featureElement;
    liFragment.appendChild(newElement);
    return liFragment;
  };
  var removeCard = function () {
    var card = map.querySelector('article.map__card');
    if (card) {
      map.removeChild(card);
    }
  };
  var onCloseClick = function () {
    removeCard();
    window.pin.deactivate();
  };
  var onCloseEnter = function (evt) {
    if (evt.keyCode === 13) {
      removeCard();
      window.pin.deactivate();
    }
  };
  var keyDownEscape = function (evt) {
    if (evt.keyCode === 27) {
      removeCard();
      window.pin.deactivate();
    }
  };
  var getCard = function (offer) {
    var template = document.querySelector('template');
    var mapCard = template.content.querySelector('article.map__card');
    var offerCard = mapCard.cloneNode(true);
    var popUpClose = offerCard.querySelector('.popup__close');
    var cardElementP = offerCard.querySelectorAll('p');
    var ulElement = offerCard.querySelector('.popup__features');
    offerCard.querySelector('.popup__features').textContent = '';
    offerCard.querySelector('h3').textContent = offer.offer.title;
    offerCard.querySelector('h4').textContent = offerType[offer.offer.type];
    offerCard.querySelector('.popup__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
    offerCard.querySelector('small').textContent = offer.offer.address;
    offerCard.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
    cardElementP[2].textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElementP[3].textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    var featuresList = offer.offer.features;
    for (var i = 0; i < featuresList.length; i++) {
      var element = getFeatureElement(featuresList[i]);
      ulElement.appendChild(element);
    }
    cardElementP[4].textContent = offer.offer.description;
    popUpClose.addEventListener('click', onCloseClick);
    popUpClose.addEventListener('keydown', onCloseEnter);
    return offerCard;
  };
  document.addEventListener('keydown', keyDownEscape);

  window.card = {
    remove: removeCard,
    get: getCard
  };
})();
