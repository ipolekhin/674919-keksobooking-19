'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  // var housingTypeFilter = mapFilters.querySelector('#housing-type');
  // var housingPriceFilter = mapFilters.querySelector('#housing-price');
  // var housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
  // var housingGuestsFilter = mapFilters.querySelector('#housing-guests');
  //
  // var housingFeaturesWifiFilter = mapFilters.querySelector('#filter-wifi');
  // var housingFeaturesDishwasherFilter = mapFilters.querySelector('#filter-dishwasher');
  // var housingFeaturesParkingFilter = mapFilters.querySelector('#filter-parking');
  // var housingFeaturesWasherFilter = mapFilters.querySelector('#filter-washer');
  // var housingFeaturesElevatorFilter = mapFilters.querySelector('#filter-elevator');
  // var housingFeaturesConditionerFilter = mapFilters.querySelector('#filter-conditioner');

  var filterChangeHandler = function (evt) {
    var newPins = [];
    var selectAllPins = similarListElement.querySelectorAll('.map__pin--mark');
    // console.log('сработал фильтр');

    // скрыть открытую карточку объявления
    window.card.closeMapCard();

    // удаляем все пины
    if (selectAllPins) {
      selectAllPins.forEach(function (pin) {
        // console.log(mark);
        pin.remove();
      });
    }

    window.pin.pins.forEach(function (it) {
      // console.log(it.offer.type);
      if (evt.target.value === it.offer.type) {
        newPins.push(it);
      }
    });

    // console.log(evt.target.value);
    // console.log(newPins);
    window.map.createPins(newPins);
  };

  mapFilters.addEventListener('change', filterChangeHandler);

  window.filters = {

  };

})();
