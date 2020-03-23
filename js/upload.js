'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var main = document.querySelector('main');
  var messageErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var messageSuccessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var documentClickHandler = function (evt) {
    if (evt.button === 0) {
      document.removeEventListener('mousedown', documentClickHandler);
      document.removeEventListener('keydown', documentEnterPressHandler);
      main.lastChild.remove();
    }
  };

  var documentEnterPressHandler = function (evt) {
    if (evt.key === window.constants.Key.ESC) {
      document.removeEventListener('mousedown', documentClickHandler);
      document.removeEventListener('keydown', documentEnterPressHandler);
      main.lastChild.remove();
    }
  };

  var addMessageOnPage = function (template) {
    var addMessage = template.cloneNode(true);
    main.appendChild(addMessage);
    document.addEventListener('mousedown', documentClickHandler);
    document.addEventListener('keydown', documentEnterPressHandler);
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);

        addMessageOnPage(messageSuccessTemplate);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);

        addMessageOnPage(messageErrorTemplate);
      }
    });

    xhr.addEventListener('error', function () {
      onError(window.message.Request.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(window.message.Request.TIMEOUT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
