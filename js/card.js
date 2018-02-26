'use strict';
(function () {
  var map = document.querySelector('.map');
  var currentCard;

  var offerType = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var getFeatureElement = function (featureElement) {
    var liFragment = document.createDocumentFragment();
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + featureElement;
    liFragment.appendChild(newElement);
    return liFragment;
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
    featuresList.forEach(function (i) {
      var element = getFeatureElement(featuresList[i]);
      ulElement.appendChild(element);
    });
    cardElementP[4].textContent = offer.offer.description;
    popUpClose.addEventListener('click', onCloseClick);
    popUpClose.addEventListener('keydown', onCloseEnter);
    currentCard = offerCard;
    return offerCard;
  };

  var showCard = function (offer) {
    window.card.remove();
    window.map.insertElement(window.card.get(offer));
  };

  var removeCard = function () {
    if (currentCard) {
      map.removeChild(currentCard);
    }
  };

  var onCloseClick = function () {
    removeCard();
    window.pin.deactivate();
  };
  var onCloseEnter = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      removeCard();
      window.pin.deactivate();
    }
  };
  var keyDownEscape = function (evt) {
    if (evt.keyCode === KeyCodes.ESC) {
      removeCard();
      window.pin.deactivate();
    }
  };
  document.addEventListener('keydown', keyDownEscape);

  window.card = {
    get: getCard,
    show: showCard,
    remove: removeCard
  };
})();
