'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var filterChangeHandler = function (evt) {
    // console.log('сработал фильтр');

    // скрыть открытую карточку объявления
    window.card.closeMapCard();
    // удаляем все пины
    window.map.deleteAllPins();

    window.pin.pinsCopy = window.pin.pins.filter(function (pin) {
      if (evt.target.value === 'any') {
        return window.pin.pins;
      }
      return pin.offer.type === evt.target.value;
    });

    // console.log(window.pin.pinsCopy);

    window.map.createPins(window.pin.pinsCopy);
  };

  mapFilters.addEventListener('change', filterChangeHandler);

  window.filters = {

  };
})();
