'use strict';

(function () {
  var SHARP_END = 22;
  var MAX_ARRAY_LENGTH = 5;
  var mainPin = document.querySelector('.map__pin--main');
  var ZERO_PIN_X = mainPin.offsetLeft;
  var ZERO_PIN_Y = mainPin.offsetTop;
  var WIDTH_MAIN_PIN = mainPin.offsetWidth;
  var HEIGHT_MAIN_PIN = mainPin.querySelector('img').offsetHeight;
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var mapPins = document.querySelector('.map__pins');

  window.constants = {
    Border: {
      LEFT: 0 - WIDTH_MAIN_PIN / 2,
      RIGHT: mapPins.offsetWidth + WIDTH_MAIN_PIN / 2,
      TOP: 130 - HEIGHT_MAIN_PIN - SHARP_END,
      BOTTOM: 630 - HEIGHT_MAIN_PIN - SHARP_END,
    },
    Key: {
      ESC: 'Escape',
      ENTER: 'Enter',
    },
    Style: {
      BORDER_RED: '2px solid red',
      BORDER_NONE: 'none',
    },
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
    ZERO_PIN_X: ZERO_PIN_X,
    ZERO_PIN_Y: ZERO_PIN_Y,
    SHARP_END: SHARP_END,
    MAX_ARRAY_LENGTH: MAX_ARRAY_LENGTH,
  };
})();
