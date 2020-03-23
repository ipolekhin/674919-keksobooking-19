'use strict';

(function () {
  // Главный блок
  var mapBlock = document.querySelector('.map');
  // Находим блок, в который будем вставлять наши метки
  var similarListElement = document.querySelector('.map__pins');
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  // Находим шаблон, который будем использовать для клонирования меток
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  // Оптимизация, создаем фрагмент, в котором будут хранится объекты
  var fragmentPins = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var addForm = document.querySelector('.ad-form');

  // В i-ый шаблон записываем входные данные из массива
  var renderPin = function (pin, number) {
    // Вызываем функцию clonNode на найденном ранее элементе
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.classList.add('map__pin--mark');
    pinElement.children[0].setAttribute('data-number', number);
    // У метки указываем координату X
    pinElement.style.left = '' + Math.round(pin.location.x - WIDTH_PIN / 2) + 'px';
    // У метки указываем координату Y
    pinElement.style.top = '' + Math.round(pin.location.y - HEIGHT_PIN) + 'px';
    // У изображения метки указываем аватар
    pinElement.querySelector('img').src = pin.author.avatar;
    // У изображения метки указываем альтернативный текст
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
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

  window.map = {
    // Активация карты и формы и создаем обрабочтки move на главный pin
    activationClickHandler: function (evt) {
      if (evt.key === window.constants.Key.ENTER) {
        window.map.loadActivePage();
        mainPin.removeEventListener('keydown', window.map.activationClickHandler);
      }
    },

    // Функция отрисовки похожих объявлений не более 5
    drawPins: function (data) {
      window.pin.pinsCopy = data.map(function (pins) {
        return pins;
      });

      if (window.pin.pinsCopy.length > window.constants.MAX_ARRAY_LENGTH) {
        window.pin.pinsCopy.length = window.constants.MAX_ARRAY_LENGTH;
      }

      // В цикле собираем шаблон с метками в нашем фрагменте
      window.pin.pinsCopy.forEach(function (item, index) {
        fragmentPins.appendChild(renderPin(item, index));
      });

      // Добавляем итоговый DOM элемент fragmentPins на страницу.
      similarListElement.appendChild(fragmentPins);
    },

    // Загрузка активного состояния страницы
    loadActivePage: function () {
      // Начать загрузку данных
      window.pin.loadData();
      // Находим блок .map и убираем класс .map--faded
      mapBlock.classList.remove('map--faded');
      // У формы заполнения информации об объявлении убираем класс ad-form--disabled
      addForm.classList.remove('ad-form--disabled');
      // Разблокируем все fieldset элементы
      window.form.loadStatusOfAd(false);
      // В функцию передаем значение в активном состояние
      window.form.fillInputAddress(window.map.getCoordinateOfPin(true));
    },

    // Вычисление координаты
    getCoordinateOfPin: function (active) {
      var y = active && !mapBlock.classList.contains('map--faded') ?
        window.constants.HEIGHT_MAIN_PIN + window.constants.SHARP_END :
        window.constants.HEIGHT_MAIN_PIN / 2;

      return Math.round(mainPin.offsetLeft + window.constants.WIDTH_MAIN_PIN / 2)
        + ', ' + Math.round(mainPin.offsetTop + y);
    },

    deleteAllPins: function () {
      var selectAllPins = similarListElement.querySelectorAll('.map__pin--mark');

      // обработчик активации карты при нажатии на ENTER
      mainPin.addEventListener('keydown', this.activationClickHandler);

      selectAllPins.forEach(function (pin) {
        pin.remove();
      });
    },

    // Загрузка страницы в неактивное состояние
    loadInactivePage: function () {
      // Удалить все метки с карты
      window.map.deleteAllPins();
      // Закрыть карточку объявления
      window.card.close();

      mapBlock.classList.add('map--faded');
      addForm.classList.add('ad-form--disabled');
      window.form.reset();
      // Блокируем форму объявления
      window.form.loadStatusOfAd(true);
      // Блокируем фильтр
      window.form.loadStatusOfFilters(true);
      setZeroCoordinateOfPin();
      window.form.fillInputAddress(window.map.getCoordinateOfPin());
      // очищаем картинки в форме
      window.photo.clean();
    },
  };

  window.map.loadInactivePage();
})();
