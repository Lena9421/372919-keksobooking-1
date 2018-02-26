'use strict';
(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var ErrorMessage = {
    TIMEOUT: 'Запрос не успел выполниться за ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    STATUS: 'Cтатус ответа: '
  };

  var initRequest = function (onLoad, onError) {
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
      onError(ErrorMessage.CONNECTION_ERROR + xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  var getData = function (onLoad, onError) {
    var xhr = initRequest(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = initRequest(onLoad, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  var onError = function (message) {
    var modal = document.createElement('div');
    modal.classList.add('modal--show');
    modal.textContent = message;
    document.body.appendChild(modal);

    setTimeout(function () {
      modal.remove();
    }, 5000);
  };

  window.backend = {
    sendData: sendData,
    getData: getData,
    onError: onError
  };

})();
