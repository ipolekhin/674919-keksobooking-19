'use strict';

// Объявим перменную для цикла
var i = 0;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
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
var mainPin = document.querySelector('.map__pin--main');
var sharpEnd = 22;
var adForm = document.querySelector('.ad-form');
var fieldset = adForm.querySelectorAll('fieldset');
var ipnutAdress = document.querySelector('#address');

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
  for (i = 0; i < 8; i++) {
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
        'type': HOUSING_TYPE[generateNumbersOfRange(MIN_VALUE - 1, HOUSING_TYPE.length - 1)],
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

// Функция отрисовки похожих объявлений
var createPins = function () {
  // В цикле собираем шаблон с метками в нашем фрагменте
  for (i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  // Добавляем итоговый DOM элемент fragment на страницу.
  similarListElement.appendChild(fragment);
};

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
  // Для теста нулевых данных
  // pin.author.avatar = 0;
  // pin.offer.price = 0;
  // pin.offer.photos = [];

  // Проверка входных данных, если данных не хватает, скрываем блок
  for (var keys in pin) {
  // JSLint рекомендует проверить, что мы работаете с соответствующим типом ключа
    if (pin.hasOwnProperty(keys)) {
      if (pin[keys].length === 0 || !pin[keys]) {
        cardElement.classList.add('hidden');
      }
      for (var key in pin[keys]) {
        if (pin[keys][key].length === 0 || !pin[keys][key]) {
          cardElement.classList.add('hidden');
        }
      }
    }
  }

  return cardElement;
};

// Закрыть карточку объявления
var closeMapCard = function () {
  var mapCard = document.querySelector('.map__card ');
  if (mapCard) {
    mapCard.remove();
  }
};

// Открыть карточку объявления
var openMapCard = function (numberPin) {
  fragment.appendChild(cardPreview(pins[numberPin]));

  // Добавляем итоговый DOM элемент fragment на страницу перед блоком .map__filters-container
  mapBlock.insertBefore(fragment, document.querySelector('.map__filters-container'));

  var popupClose = document.querySelector('.map__card')
    .querySelector('.popup__close');
  popupClose.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      closeMapCard();
    }
  });
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY || evt.key === ENTER_KEY) {
      closeMapCard();
    }
  });
};

// Функция блокирвоки или разблокировки полей форм заполнения информации об объявлении .ad-form
var inactiveState = function (disabled) {
  if (disabled) {
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].setAttribute('disabled', disabled);
    }
  } else {
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
  }
};
// Блокируем все fieldset элементы
inactiveState(true);

// Вычисление координаты
var getCoordinateOfPin = function (active) {
  if (active) {
    var y = mainPin.offsetHeight + sharpEnd;
  } else {
    y = mainPin.offsetHeight / 2;
  }

  return Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2)
    + ', ' + Math.round(mainPin.offsetTop + y);
};

// Устанавливаем значения поля ввода адреса
var fillInputAdress = function (value) {
  ipnutAdress.value = value;
};
fillInputAdress(getCoordinateOfPin());

var activationButtonClickHandler = function () {
  // Находим блок .map и убираем класс .map--faded
  mapBlock.classList.remove('map--faded');
  // У формы заполнения информации об объявлении убираем класс ad-form--disabled
  adForm.classList.remove('ad-form--disabled');
  // Разблокируем все fieldset элементы
  inactiveState(false);
  // В функцию передаем значение в активном состояние
  fillInputAdress(getCoordinateOfPin(true));
  // Вызываем функцию отрисовки pins (маркеры объявлений)
  createPins();
};

var interactionPinHandler = function (evt) {
  if (mapBlock.classList.contains('map--faded')) {
    // Активация карты
    activationButtonClickHandler();
  }

  // Открытие карточки объявления
  if (evt.target && evt.target.closest('button[type="button"]')) {
    // Нетривиальное нахождение номера объекта
    if (evt.target.src) {
      var numberPin = parseInt(evt.target.src.slice(-5), 16) - 1;
    } else {
      numberPin = parseInt(evt.target.children[0].src.slice(-5), 16) - 1;
    }
    // console.log(numberPin);
    closeMapCard();
    openMapCard(numberPin);
  }
};

similarListElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    interactionPinHandler(evt);
  }
});

similarListElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    interactionPinHandler(evt);
  }
});

// Временно активируем карту, чтобы тестить форму!!!!!
// activationButtonClickHandler();

var form = document.querySelector('.ad-form');
var inputTitleForm = form.querySelector('#title');
var selectTypeForm = form.querySelector('#type');
var inputPriceForm = form.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var formChangeHandler = function (evt) {
  if (evt.target.id === inputTitleForm.id) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Минимальная длина — 30 символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Максимальная длина — 100 символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  if (evt.target.id === selectTypeForm.id) {
    switch (evt.target.value) {
      case 'bungalo':
        inputPriceForm.min = 0;
        break;
      case 'flat':
        inputPriceForm.min = 1000;
        break;
      case 'house':
        inputPriceForm.min = 5000;
        break;
      case 'palace':
        inputPriceForm.min = 10000;
        break;
      default:
        inputPriceForm.min = 1000;
        break;
    }
  }

  if (evt.target.id === inputPriceForm.id) {
    if (evt.target.validity.rangeUnderflow) {
      evt.target.setCustomValidity('Минимальное значение — ' + evt.target.min);
    } else if (evt.target.validity.rangeOverflow) {
      evt.target.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (evt.target.validity.typeMismatch) {
      evt.target.setCustomValidity('Числовое поле');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  if (evt.target.id === timeIn.id) {
    timeOut.selectedIndex = evt.target.selectedIndex;
  } else if (evt.target.id === timeOut.id) {
    timeIn.selectedIndex = evt.target.selectedIndex;
  }

  if (evt.target.id === roomNumber.id) {
    if (roomNumber.value === '100' && capacity.value === '0') {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    } else if (roomNumber.value !== capacity.value) {
      roomNumber.setCustomValidity('Количество комнат должно быть равно количеству гостей!!!');
      capacity.setCustomValidity('');
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  } else if (evt.target.id === capacity.id) {
    if (roomNumber.value === '100' && capacity.value === '0') {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    } else if (capacity.value !== roomNumber.value) {
      capacity.setCustomValidity('Количество гостей должно быть равно количеству комнат!!!');
      roomNumber.setCustomValidity('');
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  }
};

form.addEventListener('change', formChangeHandler);

// console.log(form);

form.addEventListener('submit', function (evt) {
  // временно для теста
  // console.log('Кол-во комнат = Кол-во мест - ' + roomNumber.value + ' = ' + capacity.value);
  if (roomNumber.value === '100' && capacity.value === '0' || roomNumber.value === '100' && capacity.value === '0') {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
    // {временно для теста
    // console.log('форму отправили не для гостей');
    // evt.preventDefault();
    // временно для теста}
  } else if (roomNumber.value !== capacity.value) {
    evt.preventDefault();
    // временно для теста
    // console.log('форму не отправляем');
  } else {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
    // {временно для теста
    // console.log('форму отправили');
    // evt.preventDefault();
    // временно для теста}
  }
});
