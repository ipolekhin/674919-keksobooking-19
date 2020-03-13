'use strict';

(function () {
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var mapPins = document.querySelector('.map__pins');
  var BORDER_LEFT = 0;
  var BORDER_RIGHT = mapPins.offsetWidth;
  var BORDER_TOP = 130;
  var BORDER_BOTTOM = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var ZERO_PIN_X = mainPin.offsetLeft;
  var ZERO_PIN_Y = mainPin.offsetTop;
  var WIDTH_MAIN_PIN = mainPin.offsetWidth;
  var HEIGHT_MAIN_PIN = mainPin.offsetHeight;

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.constants = {
    BORDER_LEFT: BORDER_LEFT,
    BORDER_RIGHT: BORDER_RIGHT,
    BORDER_TOP: BORDER_TOP,
    BORDER_BOTTOM: BORDER_BOTTOM,
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    ZERO_PIN_X: ZERO_PIN_X,
    ZERO_PIN_Y: ZERO_PIN_Y,
  };
})();
