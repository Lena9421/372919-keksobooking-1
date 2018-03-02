'use strict';
(function () {
  var ESC_CODE = 27;

  var OfferTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var ImgProps = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var mapCard = template.content.querySelector('article.map__card');

  var currentCard;

  var getFeature = function (featureMod) {
    var featureItem = document.createElement('li');

    featureItem.className = 'feature feature--' + featureMod;

    return featureItem;
  };

  var createPicture = function (photoSrc) {
    var listElement = document.createElement('li');
    var imgListElement = document.createElement('img');

    imgListElement.src = photoSrc;
    imgListElement.width = ImgProps.WIDTH;
    imgListElement.height = ImgProps.HEIGHT;
    imgListElement.classList.add('app__img');

    listElement.appendChild(imgListElement);

    return listElement;
  };

  var getCard = function (offer) {
    var offerCard = mapCard.cloneNode(true);

    var popUpClose = offerCard.querySelector('.popup__close');
    var cardParagraphs = offerCard.querySelectorAll('p');
    var featuresContainer = offerCard.querySelector('.popup__features');
    var picturesContainer = offerCard.querySelector('.popup__pictures');

    offerCard.querySelector('.popup__features').textContent = '';
    offerCard.querySelector('h3').textContent = offer.offer.title;
    offerCard.querySelector('h4').textContent = OfferTypes[offer.offer.type];
    offerCard.querySelector('.popup__price').textContent = offer.offer.price + '\t\u20BD/ночь';
    offerCard.querySelector('small').textContent = offer.offer.address;

    offerCard.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);

    cardParagraphs[2].textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardParagraphs[3].textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

    var featuresList = offer.offer.features;

    featuresList.forEach(function (feature) {
      featuresContainer.appendChild(getFeature(feature));
    });

    var pictureList = offer.offer.photos;

    pictureList.forEach(function (picture) {
      picturesContainer.appendChild(createPicture(picture));
    });

    cardParagraphs[4].textContent = offer.offer.description;

    popUpClose.addEventListener('click', onCloseClick);

    currentCard = offerCard;

    return offerCard;
  };

  var removeCard = function () {
    if (currentCard) {
      map.removeChild(currentCard);
      document.addEventListener('keydown', onKeyDownEscape);

      currentCard = null;
    }
  };

  var showCard = function (offer) {
    removeCard();
    window.map.insertElement(getCard(offer));
    document.addEventListener('keydown', onKeyDownEscape);
  };

  var onCloseClick = function () {
    removeCard();
    window.pin.deactivate();
  };

  var onKeyDownEscape = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      removeCard();
      window.pin.deactivate();
    }
  };


  window.card = {
    show: showCard,
    remove: removeCard
  };
})();
