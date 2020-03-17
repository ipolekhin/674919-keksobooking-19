'use strict';

(function () {
  var addForm = document.querySelector('.ad-form');
  var submitButton = addForm.querySelector('.ad-form__submit');
  var resetButton = addForm.querySelector('.ad-form__reset');
  var fieldset = addForm.querySelectorAll('fieldset');
  var ipnutAdress = addForm.querySelector('#address');
  var inputTitleForm = addForm.querySelector('#title');
  var selectTypeForm = addForm.querySelector('#type');
  var inputPriceForm = addForm.querySelector('#price');
  var timeIn = addForm.querySelector('#timein');
  var timeOut = addForm.querySelector('#timeout');
  var roomNumber = addForm.querySelector('#room_number');
  var capacity = addForm.querySelector('#capacity');

  var MAX_ROOMS_VALUE = '100';
  var CAPACITY_VALUE = '0';
  // Словарь
  var classListPriceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  // Временно активируем карту, чтобы тестить форму!!!!!
  // window.map.activationButtonClickHandler();

  var checkTitle = function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity(window.message.FormError.MIN_SIMBOL);
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity(window.message.FormError.MAX_SIMBOL);
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity(window.message.FormError.REQUIRED_FIELD);
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var checkType = function (evt) {
    inputPriceForm.min = classListPriceOfType[evt.target.value];
  };

  var checkPrice = function (evt) {
    if (evt.target.validity.rangeUnderflow) {
      evt.target.setCustomValidity(window.message.FormError.MIN_PRICE + evt.target.min);
    } else if (evt.target.validity.rangeOverflow) {
      evt.target.setCustomValidity(window.message.FormError.MAX_PRICE);
    } else if (evt.target.validity.typeMismatch) {
      evt.target.setCustomValidity(window.message.FormError.NUMERIC_FIELD);
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity(window.message.FormError.REQUIRED_FIELD);
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
    if (roomNumber.value === MAX_ROOMS_VALUE && capacity.value === CAPACITY_VALUE) {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    } else if (roomNumber.value !== capacity.value) {
      roomNumber.setCustomValidity(window.message.FormError.ROOM);
      capacity.setCustomValidity('');
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  var checkCapacity = function () {
    if (roomNumber.value === MAX_ROOMS_VALUE && capacity.value === CAPACITY_VALUE) {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    } else if (capacity.value !== roomNumber.value) {
      capacity.setCustomValidity(window.message.FormError.CAPACITY);
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

  var startButtonsInteractive = function () {
    submitButton.textContent = window.message.Buttons.SEND;
    submitButton.disabled = true;
  };

  var endButtonsInteractive = function () {
    submitButton.textContent = window.message.Buttons.DEFAULT;
    submitButton.disabled = false;
  };

  var onError = function () {
    endButtonsInteractive();
  };

  var onSuccess = function () {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');

    window.map.loadInactivePage();

    endButtonsInteractive();
  };

  addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    startButtonsInteractive();

    window.upload(new FormData(addForm), onSuccess, onError);
  });

  resetButton.addEventListener('click', function () {
    setTimeout(window.map.loadInactivePage, 500);
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

})();
