'use strict';

(function () {
  // Объявим перменную для цикла
  var ENTER_KEY = 'Enter';
  // Главный блок
  var mapBlock = document.querySelector('.map');
  // Находим блок, в который будем вставлять наши метки
  var similarListElement = document.querySelector('.map__pins');
  // Находим шаблон, который будем использовать для клонирования меток
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  // Оптимизация, создаем фрагмент, в котором будут хранится объекты
  var fragmentPins = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var sharpEnd = 22;
  var addForm = document.querySelector('.ad-form');

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
    for (var i = 0; i < window.pin.pins.length; i++) {
      fragmentPins.appendChild(renderPin(window.pin.pins[i]));
    }

    // Добавляем итоговый DOM элемент fragmentPins на страницу.
    similarListElement.appendChild(fragmentPins);
  };

  // Вычисление координаты
  window.map = {
    getCoordinateOfPin: function (active) {
      if (active) {
        var y = mainPin.offsetHeight + sharpEnd;
      } else {
        y = mainPin.offsetHeight / 2;
      }

      return Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2)
        + ', ' + Math.round(mainPin.offsetTop + y);
    },
  };

  var activationButtonClickHandler = function () {
    // Находим блок .map и убираем класс .map--faded
    mapBlock.classList.remove('map--faded');
    // У формы заполнения информации об объявлении убираем класс ad-form--disabled
    addForm.classList.remove('ad-form--disabled');
    // Разблокируем все fieldset элементы
    window.form.inactiveState(false);
    // В функцию передаем значение в активном состояние
    window.form.fillInputAdress(window.map.getCoordinateOfPin(true));
    // Вызываем функцию отрисовки pins (маркеры объявлений)
    createPins();
  };

  // Активация карты и формы и создаем обрабочтки move на главный pin
  var mapActivation = function (evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      activationButtonClickHandler();
      mainPin.removeEventListener('mousedown', mapActivation);
      mainPin.removeEventListener('keydown', mapActivation);
      window.move.mainPin();
    }
  };

  mainPin.addEventListener('mousedown', mapActivation);
  mainPin.addEventListener('keydown', mapActivation);

  similarListElement.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.card.interactionPinHandler(evt);
    }
  });

  similarListElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      window.card.interactionPinHandler(evt);
    }
  });
})();
