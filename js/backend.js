'use strict';
var DATA_URL = 'https://js.dump.academy/keksobooking/data';
var URL = 'https://js.dump.academy/keksobooking';
var FormData = {
  // 'author': {
  //   'avatar': avatarAddress(i + 1)
  // },
  // 'offer': {
  //   'title': OfferInfo.TITLES[window.utils.getRandomElement(OfferInfo.TITLES)],
  //   'address': locationX + ', ' + locationY,
  //   'price': window.utils.getRandomInteger(OfferInfo.MIN_PRICE, OfferInfo.MAX_PRICE).toFixed(),
  //   'type': OfferInfo.TYPES[window.utils.getRandomElement(OfferInfo.TYPES)],
  //   'rooms': window.utils.getRandomInteger(OfferInfo.ROOMS_MIN, OfferInfo.ROOMS_MAX).toFixed(),
  //   'guests': window.utils.getRandomInteger(OfferInfo.GUESTS_MIN, OfferInfo.GUESTS_MAX).toFixed(),
  //   'checkin': OfferInfo.CHECKIN[window.utils.getRandomElement(OfferInfo.CHECKIN)],
  //   'checkout': OfferInfo.CHECKOUT[window.utils.getRandomElement(OfferInfo.CHECKOUT)],
  //   'features': window.utils.getArrayWithRandomLength(OfferInfo.FEATURES, randomArrayLength),
  //   'description': '',
  //   'photos': []
  // },
  // 'location': {
  //   x: locationX,
  //   y: locationY
  // }
};


var onLoad = function (data, callback) {
  console.log(data);

  if (typeof callback === 'function') {
    callback(data);
  }
};
var onError = function (message) {
  document.map.element.insertAdjacentHTML('afterend', '<div id="message">message</div>');
  console.error(message);

  // if (typeof callback === 'function') {
  //   callback(message);
  // }
};

window.downLoad = function (url, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
  });
  xhr.open('GET', url);
  xhr.send();
};
window.downLoad(DATA_URL, onLoad, onError);

window.upLoad = function (data, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    onLoad(xhr.response);
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.open('POST', URL);
  xhr.send(data);
};

window.upLoad(FormData, onLoad, onError);
