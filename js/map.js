'use strict';

(function () {
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

  // В i-ый шаблон записываем входные данные из массива
  var renderPin = function (pin, number) {
    // Вызываем функцию clonNode на найденном ранее элементе
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.classList.add('map__pin--mark');
    pinElement.children[0].setAttribute('data-number', number);
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

  // Активация карты и формы и создаем обрабочтки move на главный pin
  var mapActivation = function (evt) {
    if (evt.key === window.constants.Key.ENTER) {
      window.map.activationButtonClickHandler();
      mainPin.removeEventListener('keydown', mapActivation);
    }
  };

  similarListElement.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.card.interactionPinHandler(evt);
    }
  });

  similarListElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.Key.ENTER) {
      window.card.interactionPinHandler(evt);
    }
  });

  var setZeroCoordinateOfPin = function () {
    mainPin.style.left = window.constants.ZERO_PIN_X + 'px';
    mainPin.style.top = window.constants.ZERO_PIN_Y + 'px';
  };

  window.move.mainPin();

  window.map = {
    // Функция отрисовки похожих объявлений не более 5
    createPins: function (data) {
      window.pin.pinsCopy = data.map(function (pins) {
        return pins;
      });

      if (window.pin.pinsCopy.length > window.constants.MAX_ARRAY_LENGTH) {
        window.pin.pinsCopy.length = window.constants.MAX_ARRAY_LENGTH;
      }

      // В цикле собираем шаблон с метками в нашем фрагменте
      for (var i = 0; i < window.pin.pinsCopy.length; i++) {
        fragmentPins.appendChild(renderPin(data[i], i));
      }

      // Добавляем итоговый DOM элемент fragmentPins на страницу.
      similarListElement.appendChild(fragmentPins);
    },

    activationButtonClickHandler: function () {
      // Находим блок .map и убираем класс .map--faded
      mapBlock.classList.remove('map--faded');
      // У формы заполнения информации об объявлении убираем класс ad-form--disabled
      addForm.classList.remove('ad-form--disabled');
      // Разблокируем все fieldset элементы
      window.form.inactiveState(false);
      // В функцию передаем значение в активном состояние
      window.form.fillInputAdress(window.map.getCoordinateOfPin(true));
      // Вызываем функцию отрисовки pins (маркеры объявлений)
      window.map.createPins(window.pin.pins);
    },

    // Вычисление координаты
    getCoordinateOfPin: function (active) {
      if (active && !mapBlock.classList.contains('map--faded')) {
        var y = window.constants.HEIGHT_MAIN_PIN + sharpEnd;
      } else {
        y = window.constants.HEIGHT_MAIN_PIN / 2;
      }

      return Math.round(mainPin.offsetLeft + window.constants.WIDTH_MAIN_PIN / 2)
        + ', ' + Math.round(mainPin.offsetTop + y);
    },

    deleteAllPins: function () {
      var selectAllPins = similarListElement.querySelectorAll('.map__pin--mark');

      // обработчик активации карты при нажатии на ENTER
      mainPin.addEventListener('keydown', mapActivation);

      if (selectAllPins) {
        selectAllPins.forEach(function (pin) {
          pin.remove();
        });
      }
    },

    // Загрузка страницы в неактивное состояние
    loadInactivePage: function () {
      // Удалить все метки с карты
      window.map.deleteAllPins();
      // Закрыть карточку объявления
      window.card.closeMapCard();

      mapBlock.classList.add('map--faded');
      addForm.classList.add('ad-form--disabled');
      window.form.resetForm();
      // Блокируем все элементы form
      window.form.inactiveState(true);
      setZeroCoordinateOfPin();
      window.form.fillInputAdress(window.map.getCoordinateOfPin());
    },
  };

  window.map.loadInactivePage();
})();
