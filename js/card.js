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

  var ImgProp = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var getFeature = function (featureMod) {
    var featureListFragment = document.createDocumentFragment();
    var featureItem = document.createElement('li');
    featureItem.className = 'feature feature--' + featureMod;
    featureListFragment.appendChild(featureItem);
    return featureListFragment;
  };
  var createPicture = function (photoSrc) {
    var photosListFragment = document.createDocumentFragment();
    var listElement = document.createElement('li');
    var imgListElement = document.createElement('img');
    imgListElement.src = photoSrc;
    imgListElement.width = ImgProp.WIDTH;
    imgListElement.height = ImgProp.HEIGHT;
    imgListElement.classList.add('app__img');
    listElement.appendChild(imgListElement);
    photosListFragment.appendChild(listElement);
    return photosListFragment;
  };


  var getCard = function (offer) {
    var template = document.querySelector('template');
    var mapCard = template.content.querySelector('article.map__card');
    var offerCard = mapCard.cloneNode(true);
    var popUpClose = offerCard.querySelector('.popup__close');
    var cardElementP = offerCard.querySelectorAll('p');
    var featuresContainer = offerCard.querySelector('.popup__features');
    var picturesContainer = offerCard.querySelector('.popup__pictures');
    offerCard.querySelector('.popup__features').textContent = '';
    offerCard.querySelector('h3').textContent = offer.offer.title;
    offerCard.querySelector('h4').textContent = offerType[offer.offer.type];
    offerCard.querySelector('.popup__price').innerHTML = offer.offer.price + '&#x20bd;/ночь';
    offerCard.querySelector('small').textContent = offer.offer.address;
    offerCard.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
    cardElementP[2].textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElementP[3].textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    var featuresList = offer.offer.features;
    featuresList.forEach(function (elem, i) {
      var element = getFeature(featuresList[i]);
      featuresContainer.appendChild(element);
    });
    var pictureList = offer.offer.photos;
    pictureList.forEach(function (elem) {
      var element = createPicture(elem);
      picturesContainer.appendChild(element);
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
