'use strict';

(function () {
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var mapPins = document.querySelector('.map__pins');
  var BORDER_LEFT = 0;
  var BORDER_RIGHT = mapPins.offsetWidth;
  var BORDER_TOP = 130;
  var BORDER_BOTTOM = 630;
  var WIDTH_MAIN_PIN = document.querySelector('.map__pin--main').offsetWidth;
  var HEIGHT_MAIN_PIN = document.querySelector('.map__pin--main').offsetWidth;

  window.constants = {
    BORDER_LEFT: BORDER_LEFT,
    BORDER_RIGHT: BORDER_RIGHT,
    BORDER_TOP: BORDER_TOP,
    BORDER_BOTTOM: BORDER_BOTTOM,
    WIDTH_MAIN_PIN: WIDTH_MAIN_PIN,
    HEIGHT_MAIN_PIN: HEIGHT_MAIN_PIN,
  };
})();
