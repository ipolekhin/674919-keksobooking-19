'use strict';

(function () {
  var MAX_ARRAY_LENGTH = 5;
  var mapFilters = document.querySelector('.map__filters');

  var filterChangeHandler = function (evt) {
    // console.log('сработал фильтр');

    // скрыть открытую карточку объявления
    window.card.closeMapCard();
    // удаляем все пины
    window.map.deleteAllPins();

    window.pin.pinsCopy = window.pin.pins.filter(function (pin) {
      return pin.offer.type === evt.target.value;
    });

    // console.log(window.pin.pinsCopy);

    if (window.pin.pinsCopy.length > MAX_ARRAY_LENGTH) {
      window.pin.pinsCopy.length = MAX_ARRAY_LENGTH;
    }

    window.map.createPins(window.pin.pinsCopy);
  };

  mapFilters.addEventListener('change', filterChangeHandler);

  window.filters = {

  };

})();
