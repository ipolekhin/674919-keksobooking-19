'use strict';

(function () {
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var mapPins = document.querySelector('.map__pins');

  var mainPin = document.querySelector('.map__pin--main');
  var ZERO_PIN_X = mainPin.offsetLeft;
  var ZERO_PIN_Y = mainPin.offsetTop;
  var WIDTH_MAIN_PIN = mainPin.offsetWidth;
  var HEIGHT_MAIN_PIN = mainPin.offsetHeight;
  var MAX_ARRAY_LENGTH = 5;

  window.constants = {
    Border: {
      LEFT: 0,
      RIGHT: mapPins.offsetWidth,
      TOP: 130,
      BOTTOM: 630,
    },
    Key: {
      ESC: 'Escape',
      ENTER: 'Enter',
    },
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
    ZERO_PIN_X: ZERO_PIN_X,
    ZERO_PIN_Y: ZERO_PIN_Y,
    MAX_ARRAY_LENGTH: MAX_ARRAY_LENGTH,
  };
})();
