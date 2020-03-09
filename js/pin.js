'use strict';

(function () {
  // Создаем пустой массив
  var pins = [];

  // С помощью функции генерируем случайное число от и до
  var generateNumbersOfRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // С помощью функции генерируем массив случайной длины
  var sliceArr = function (arr) {
    return arr.slice(0, generateNumbersOfRange(1, arr.length));
  };

  // С помощью функции выбираем случайное значение из массива
  var chooseValueOfArr = function (arr) {
    var length = generateNumbersOfRange(1, arr.length);
    return arr[length - 1];
  };

  // Функция, которая заполняет массив 'pins' данными
  var mocksData = function () {
    var location = {};
    for (var i = 0; i < 8; i++) {
      location = {
        x: (generateNumbersOfRange(window.constants.BORDER_LEFT, window.constants.BORDER_RIGHT) - window.data.WIDTH_PIN / 2),
        y: (generateNumbersOfRange(window.constants.BORDER_TOP, window.constants.BORDER_BOTTOM) - window.data.HEIGHT_PIN),
      };
      pins.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'Объявение №' + (i + 1),
          'address': location.x + ', ' + location.y,
          'price': generateNumbersOfRange(window.data.MIN_PRICE, window.data.MAX_PRICE),
          'type': window.data.HOUSING_TYPE[generateNumbersOfRange(window.data.MIN_VALUE - 1, window.data.HOUSING_TYPE.length - 1)],
          'rooms': generateNumbersOfRange(window.data.MIN_HOUSING_ROOMS, window.data.MAX_HOUSING_ROOMS),
          'guests': generateNumbersOfRange(window.data.MIN_HOUSING_GUESTS, window.data.MAX_HOUSING_GUESTS),
          'checkin': chooseValueOfArr(window.data.CHECK),
          'checkout': chooseValueOfArr(window.data.CHECK),
          'features': sliceArr(window.data.FEATURES),
          'description': 'Описание №' + (i + 1),
          'photos': sliceArr(window.data.PHOTOS)
        },
        'location': location
      });
    }

    return pins;
  };

  var sendData = function (data) {
    window.pin = {
      pins: data,
    };
  };

  var onError = function () {
    mocksData();
    sendData(pins);
  };

  var onSuccess = function (data) {
    sendData(data);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);


  // Выведим в консоль заполненный массив из сгенерированных JS объектов
  // console.log(pins);
})();
