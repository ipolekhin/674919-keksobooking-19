'use strict';

(function () {
  // Находим блок, в который будем вставлять наши метки, для вычисления ширины
  var similarListElement = document.querySelector('.map__pins');
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;
  var MIN_VALUE = 1;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 100000;
  var HOUSING_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];
  var MIN_HOUSING_ROOMS = 1;
  var MAX_HOUSING_ROOMS = 5;
  var MIN_HOUSING_GUESTS = 2;
  var MAX_HOUSING_GUESTS = 8;
  var CHECK = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = similarListElement.offsetWidth;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  window.data = {
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    MIN_VALUE: MIN_VALUE,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    HOUSING_TYPE: HOUSING_TYPE,
    MIN_HOUSING_ROOMS: MIN_HOUSING_ROOMS,
    MAX_HOUSING_ROOMS: MAX_HOUSING_ROOMS,
    MIN_HOUSING_GUESTS: MIN_HOUSING_GUESTS,
    MAX_HOUSING_GUESTS: MAX_HOUSING_GUESTS,
    CHECK: CHECK,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    MIN_COORDINATE_X: MIN_COORDINATE_X,
    MAX_COORDINATE_X: MAX_COORDINATE_X,
    MIN_COORDINATE_Y: MIN_COORDINATE_Y,
    MAX_COORDINATE_Y: MAX_COORDINATE_Y,
  };
})();
