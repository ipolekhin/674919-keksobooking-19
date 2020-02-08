'use strict';

// Главный блок
var mapBlock = document.querySelector('.map');

// Находим блок, в который будем вставлять наши метки
var similarListElement = document.querySelector('.map__pins');
// Находим шаблон, который будем использовать для клонирования меток
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardPreviewTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
// Оптимизация, создаем фрагмент, в котором будут хранится объекты
var fragment = document.createDocumentFragment();
// Создаем пустой массив wizards
var pins = [];
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

// Находим блок .map и убираем класс .map--faded
mapBlock.classList.remove('map--faded');

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
var fillArray = function () {
  var location = {};
  for (var i = 0; i < 8; i++) {
    location = {
      x: (generateNumbersOfRange(MIN_COORDINATE_X, MAX_COORDINATE_X) - WIDTH_PIN / 2),
      y: (generateNumbersOfRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y) - HEIGHT_PIN),
    };
    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Объявение №' + (i + 1),
        'address': location.x + ', ' + location.y,
        'price': generateNumbersOfRange(MIN_PRICE, MAX_PRICE),
        'type': HOUSING_TYPE[generateNumbersOfRange(MIN_VALUE, HOUSING_TYPE.length)],
        'rooms': generateNumbersOfRange(MIN_HOUSING_ROOMS, MAX_HOUSING_ROOMS),
        'guests': generateNumbersOfRange(MIN_HOUSING_GUESTS, MAX_HOUSING_GUESTS),
        'checkin': chooseValueOfArr(CHECK),
        'checkout': chooseValueOfArr(CHECK),
        'features': sliceArr(FEATURES),
        'description': 'Описание №' + (i + 1),
        'photos': sliceArr(PHOTOS)
      },
      'location': location
    });
  }

  return pins;
};
fillArray();

// Выведим в консоль заполненный массив из сгенерированных JS объектов
// console.log(pins);

// В i-ый шаблон записываем входными данными из массива
var renderPin = function (pin) {
  // Вызываем функцию clonNode на найденном ранее элементе
  var pinElement = similarPinTemplate.cloneNode(true);
  // У метки указываем координату X
  pinElement.style.left = '' + pin.location.x + 'px';
  // У метки указываем координату Y
  pinElement.style.top = '' + pin.location.y + 'px';
  // У изображения метки указываем аватар
  pinElement.querySelector('img').src = pin.author.avatar;
  // У изображения метки указываем альтернативный текст
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

// В цикле собираем шаблон с метками в нашем фрагменте
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

// Добавляем итоговый DOM элемент fragment на страницу
similarListElement.appendChild(fragment);

var cardPreview = function (pin) {
  var cardElement = cardPreviewTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  var offerType = pin.offer.type;
  if (offerType === 'flat') {
    offerType = 'Квартира';
  } else if (offerType === 'bungalo') {
    offerType = 'Бунгало';
  } else if (offerType === 'house') {
    offerType = 'Дом';
  } else {
    offerType = 'Дворец';
  }
  cardElement.querySelector('.popup__type').textContent = offerType;
  var offerRooms = pin.offer.rooms;
  var roomsText = ' комнаты для ';
  if (offerRooms === 1) {
    roomsText = ' комната для ';
  } else if (offerRooms >= 4) {
    roomsText = ' комнат для ';
  }
  var offerGuests = pin.offer.guests;
  var guestsText = ' гостей';
  if (offerGuests === 1) {
    guestsText = ' гостя';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = offerRooms + roomsText + offerGuests + guestsText;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  var popupFeature = cardElement.querySelectorAll('.popup__feature');
  for (i = 0; i < popupFeature.length; i++) {
    if (!pin.offer.features[i]) {
      cardElement.querySelector('.popup__features').removeChild(popupFeature[i]);
    }
  }
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  var offerPhotos = pin.offer.photos;
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  for (i = 0; i < offerPhotos.length; i++) {
    if (i > 0) {
      var ClonePopupPhoto = popupPhotos.appendChild(popupPhoto.cloneNode());
      ClonePopupPhoto.src = offerPhotos[i];
    } else {
      popupPhoto.src = offerPhotos[i];
    }
  }
  cardElement.querySelector('.popup__avatar').src = pin.author.avatar;

  return cardElement;
};

fragment.appendChild(cardPreview(pins[0]));

// Добавляем итоговый DOM элемент fragment на страницу перед блоком .map__filters-container
mapBlock.insertBefore(fragment, document.querySelector('.map__filters-container'));
