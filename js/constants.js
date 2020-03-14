'use strict';

(function () {
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var mapPins = document.querySelector('.map__pins');
  var Border = {
    LEFT: 0,
    RIGHT: mapPins.offsetWidth,
    TOP: 130,
    BOTTOM: 630,
  };

  var mainPin = document.querySelector('.map__pin--main');
  var ZERO_PIN_X = mainPin.offsetLeft;
  var ZERO_PIN_Y = mainPin.offsetTop;
  var WIDTH_MAIN_PIN = mainPin.offsetWidth;
  var HEIGHT_MAIN_PIN = mainPin.offsetHeight;

  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter',
  };

  window.constants = {
    BORDER_LEFT: Border.LEFT,
    BORDER_RIGHT: Border.RIGHT,
    BORDER_TOP: Border.TOP,
    BORDER_BOTTOM: Border.BOTTOM,
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
    ESC_KEY: Key.ESC,
    ENTER_KEY: Key.ENTER,
    ZERO_PIN_X: ZERO_PIN_X,
    ZERO_PIN_Y: ZERO_PIN_Y,
  };
})();
