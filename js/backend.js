'use strict';
(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';

  var ErrorMessage = {
    TIMEOUT: 'Запрос не успел выполниться за ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    STATUS: 'Cтатус ответа: '
  };

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(ErrorMessage.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.CONNECTION_ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError(ErrorMessage.CONNECTION_ERROR);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    sendData: sendData,
    getData: getData
  };

})();
