'use strict';

// С помощью функции генерируем случайное число от и до
var generateNumbersOfRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// С помощью функции собираем массив из неповторящихся целых чисел от 1 до 8, в случайном порядке
var generateEightRandomNumbers = function () {
  var numbersArr = [];
  var min = 1;
  var max = 8;

  while (numbersArr.length < max) {
    var trueNumber = true;
    // Вызываем функцию генерируем целое число от 1 до 8
    var number = generateNumbersOfRange(min, max);

    // В цикле проеряем полученное сгенерированное число на существование его в масиве
    for (var i = 0; i <= numbersArr.length; i++) {
      if (number === numbersArr[i]) {
        trueNumber = false;
        break;
      }
    }

    // Если в массиве числа не нашли, то запишем новое число в numbersArr[] массив
    if (trueNumber) {
      numbersArr[numbersArr.length] = number;
    }
  }
  return numbersArr;
};

// С помощью функции генерируем массив случайной длины
var generateArrLength = function (arr) {
  var randomArrLength = [];
  var length = generateNumbersOfRange(1, arr.length);
  for (var i = 0; i < length; i++) {
    randomArrLength[i] = arr[i];
  }
  return randomArrLength;
};

// С помощью функции выбираем из массива случайное значение
var generateArrNumber = function (arr) {
  var length = generateNumbersOfRange(1, arr.length);
  return arr[length - 1];
};

// Функция для создания массива из 8 сгенерированных JS объектов
var createNewArrEight = function () {
  var newArrEight = [];
  var MIN_VALUE = 1;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 100000;
  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_HOUSING_ROOMS = 1;
  var MAX_HOUSING_ROOMS = 5;
  var MIN_HOUSING_GUESTS = 2;
  var MAX_HOUSING_GUESTS = 8;
  var CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MIN_COORDINATE_X = 200;
  var MAX_COORDINATE_X = 800;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  // Вызываем функцию генерации массива целых чисел от 1 до 8
  var arrEigthNumbers = generateEightRandomNumbers();

  for (var i = 0; i < 8; i++) {
    newArrEight[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + arrEigthNumbers[i] + '.png'
      },
      'offer': {
        'title': 'Объявение №' + (i + 1),
        'address': 'ул.Ленина д.' + (i + 1),
        'price': generateNumbersOfRange(MIN_PRICE, MAX_PRICE),
        'type': HOUSING_TYPE[generateNumbersOfRange(MIN_VALUE, HOUSING_TYPE.length)],
        'rooms': generateNumbersOfRange(MIN_HOUSING_ROOMS, MAX_HOUSING_ROOMS),
        'guests': generateNumbersOfRange(MIN_HOUSING_GUESTS, MAX_HOUSING_GUESTS),
        'checkin': generateArrNumber(CHECK),
        'checkout': generateArrNumber(CHECK),
        'features': generateArrLength(FEATURES),
        'description': 'Описание №' + (i + 1),
        'photos': generateArrLength(PHOTOS)
      },
      'location': {
        'x': generateNumbersOfRange(MIN_COORDINATE_X, MAX_COORDINATE_X),
        'y': generateNumbersOfRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y),
      }
    };
  }

  return newArrEight;
};

// Выведим в консоль массив из 8 сгенерированных JS объектов
// console.log(createNewArrEight());
// Записываем полученный массив объектов
var arrData = createNewArrEight();
// Находим блок .map и убираем класс .map--faded
document.querySelector('.map').classList.remove('map--faded');
// Находим блок, в который будем вставлять наши метки
var similarListElement = document.querySelector('.map__pins');
// Находим шаблон, который будем использовать для клонирования меток
var similarMarkElement = document.querySelector('#pin').content.querySelector('.map__pin');
// Оптимизация, создаем фрагмент, в котором будут хранится объекты
var fragment = document.createDocumentFragment();

// В i-ую метку записываем даннные
var renderElement = function (element) {
  // Вызываем функцию clonNode на найденном ранее элементе
  var markElement = similarMarkElement.cloneNode(true);
  // У метки указываем координату X
  markElement.style.left = '' + element.location.x + 'px';
  // У метки указываем координату Y
  markElement.style.top = '' + element.location.y + 'px';
  // У изображения метки указываем аватар
  markElement.querySelector('img').src = element.author.avatar;
  // У изображения метки указываем альтернативный текст
  markElement.querySelector('img').alt = element.offer.title;

  return markElement;
};

// В цикле собираем метки в нашем фрагменте
for (var i = 0; i < arrData.length; i++) {
  fragment.appendChild(renderElement(arrData[i]));
}

// Добавляем изменения в DOM
similarListElement.appendChild(fragment);
