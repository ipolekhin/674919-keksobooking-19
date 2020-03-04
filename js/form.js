'use strict';

(function () {
  var addForm = document.querySelector('.ad-form');
  var fieldset = addForm.querySelectorAll('fieldset');
  var ipnutAdress = addForm.querySelector('#address');
  var inputTitleForm = addForm.querySelector('#title');
  var selectTypeForm = addForm.querySelector('#type');
  var inputPriceForm = addForm.querySelector('#price');
  var timeIn = addForm.querySelector('#timein');
  var timeOut = addForm.querySelector('#timeout');
  var roomNumber = addForm.querySelector('#room_number');
  var capacity = addForm.querySelector('#capacity');

  // Временно активируем карту, чтобы тестить форму!!!!!
  // activationButtonClickHandler();

  var checkTitle = function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Минимальная длина — 30 символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Максимальная длина — 100 символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var checkType = function (evt) {
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
  };

  var checkPrice = function (evt) {
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
  };

  var checkTimeIn = function (evt) {
    timeOut.selectedIndex = evt.target.selectedIndex;
  };

  var checkTimeOut = function (evt) {
    timeIn.selectedIndex = evt.target.selectedIndex;
  };

  var checkRoomNumber = function () {
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
  };

  var checkCapacity = function () {
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
  };

  var formChangeHandler = function (evt) {
    if (evt.target.id === inputTitleForm.id) {
      checkTitle(evt);
    }

    if (evt.target.id === selectTypeForm.id) {
      checkType(evt);
    }

    if (evt.target.id === inputPriceForm.id) {
      checkPrice(evt);
    }

    if (evt.target.id === timeIn.id) {
      checkTimeIn(evt);
    }

    if (evt.target.id === timeOut.id) {
      checkTimeOut(evt);
    }

    if (evt.target.id === roomNumber.id) {
      checkRoomNumber();
    }

    if (evt.target.id === capacity.id) {
      checkCapacity();
    }
  };

  addForm.addEventListener('change', formChangeHandler);
  // console.log(addForm);

  addForm.addEventListener('submit', function (evt) {
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

  window.form = {
    // Функция блокирвоки или разблокировки полей форм заполнения информации об объявлении .ad-form
    inactiveState: function (disabled) {
      for (var i = 0; i < fieldset.length; i++) {
        if (disabled) {
          fieldset[i].setAttribute('disabled', disabled);
        } else {
          fieldset[i].removeAttribute('disabled');
        }
      }
    },

    fillInputAdress: function (value) {
      ipnutAdress.value = value;
    },
  };

  // Блокируем все fieldset элементы
  window.form.inactiveState(true);
  window.form.fillInputAdress(window.map.getCoordinateOfPin());
})();
