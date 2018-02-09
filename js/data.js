'use strict';
(function () {
  var ImgProperties = {
    ADDRESS: 'img/avatars/user',
    PREFIX: 0,
    EXTENSION: '.png'
  };
  var OfferInfo = {
    TITLES: ['Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    TYPES: ['flat', 'house', 'bungalo'],
    ROOMS_MIN: 1,
    ROOMS_MAX: 5,
    MIN_PRICE: 1000,
    MAX_PRICE: 100000,
    GUESTS_MIN: 1,
    GUESTS_MAX: 6,
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ]
  };
  var Location = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 100,
    Y_MAX: 500
  };

  window.utils.getArrayWithRandomLength(OfferInfo.FEATURES, randomArrayLength);

  var avatarAddress = function (numberOfArrayElement) {
    return ImgProperties.ADDRESS + ImgProperties.PREFIX + numberOfArrayElement
      + ImgProperties.EXTENSION;
  };

  // создадим переменную для хранения результата выполнения функции.
  // Результат - случайная длинна массива в диапазоне от 1 до длины массива с OfferInfo.features
  var randomArrayLength = window.utils.getRandomInteger(1, OfferInfo.FEATURES.length);
  var generateOffer = function (i) {
    var locationX = window.utils.getRandomInteger(Location.X_MIN, Location.X_MAX).toFixed();
    var locationY = window.utils.getRandomInteger(Location.Y_MIN, Location.Y_MAX).toFixed();
    return {
      'author': {
        'avatar': avatarAddress(i + 1)
      },
      'offer': {
        'title': OfferInfo.TITLES[window.utils.getRandomElement(OfferInfo.TITLES)],
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomInteger(OfferInfo.MIN_PRICE, OfferInfo.MAX_PRICE).toFixed(),
        'type': OfferInfo.TYPES[window.utils.getRandomElement(OfferInfo.TYPES)],
        'rooms': window.utils.getRandomInteger(OfferInfo.ROOMS_MIN, OfferInfo.ROOMS_MAX).toFixed(),
        'guests': window.utils.getRandomInteger(OfferInfo.GUESTS_MIN, OfferInfo.GUESTS_MAX).toFixed(),
        'checkin': OfferInfo.CHECKIN[window.utils.getRandomElement(OfferInfo.CHECKIN)],
        'checkout': OfferInfo.CHECKOUT[window.utils.getRandomElement(OfferInfo.CHECKOUT)],
        'features': window.utils.getArrayWithRandomLength(OfferInfo.FEATURES, randomArrayLength),
        'description': '',
        'photos': []
      },
      'location': {
        x: locationX,
        y: locationY
      }
    };
  };

  window.data = {
    generateOffer: generateOffer
  };
})();

