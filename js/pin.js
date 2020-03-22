'use strict';

(function () {
  // Создаем пустой массив
  var pins = [];

  // С помощью функции генерируем случайное число от и до
  var generateNumbersOfRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // С помощью функции генерируем массив случайной длины
  var sliceArray = function (array) {
    return array.slice(0, generateNumbersOfRange(1, array.length));
  };

  // С помощью функции выбираем случайное значение из массива
  var chooseValueOfArray = function (array) {
    var length = generateNumbersOfRange(1, array.length);
    return array[length - 1];
  };

  // Функция, которая заполняет массив 'pins' данными
  var saveMocksData = function () {
    var MOCKS_LENGTH = 8;
    var location = {};

    for (var i = 0; i < MOCKS_LENGTH; i++) {
      location = {
        x: (generateNumbersOfRange(window.constants.Border.LEFT, window.constants.Border.RIGHT) - window.data.WIDTH_PIN / 2),
        y: (generateNumbersOfRange(window.constants.Border.TOP, window.constants.Border.BOTTOM) - window.data.HEIGHT_PIN),
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
          'checkin': chooseValueOfArray(window.data.CHECK),
          'checkout': chooseValueOfArray(window.data.CHECK),
          'features': sliceArray(window.data.FEATURES),
          'description': 'Описание №' + (i + 1),
          'photos': sliceArray(window.data.PHOTOS)
        },
        'location': location
      });
    }

    return pins;
  };

  var saveData = function (data) {
    pins = data;
  };

  var getData = function () {
    return pins;
  };

  var onError = function () {
    saveMocksData();
    // Вызываем функцию отрисовки pins с данными моков (маркеры объявлений)
    window.map.drawPins(pins);
    // Активация фильтра
    window.form.inactiveStateFilters(false);
  };

  var onSuccess = function (data) {
    window.pin.save(data);
    // Вызываем функцию отрисовки pins (маркеры объявлений)
    window.map.drawPins(pins);
    // Активация фильтра
    window.form.inactiveStateFilters(false);
  };

  window.pin = {
    loadData: function () {
      window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    },
    save: saveData,
    pins: getData,
  };
})();
