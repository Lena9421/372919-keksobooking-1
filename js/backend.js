'use strict';
var DATA_URL = 'https://js.dump.academy/keksobooking/data';
var URL = 'https://js.dump.academy/keksobooking';


window.downLoad = function (url, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });
  xhr.timeout = 1000;
  xhr.open('GET', url);
  xhr.send();
};

// window.downLoad(DATA_URL, onLoad, onError);

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


