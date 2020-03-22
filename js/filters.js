'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filterType = mapFilters.querySelector('#housing-type');
  var filterPrice = mapFilters.querySelector('#housing-price');
  var filterRoom = mapFilters.querySelector('#housing-rooms');
  var filterGuest = mapFilters.querySelector('#housing-guests');
  var filtersByHousing = {
    TYPE: 'type',
    PRICE: 'price',
    ROOMS: 'rooms',
    GUESTS: 'guests'
  };
  var classListPrice = {
    'low': 10000,
    'high': 50000,
  };

  var selectUniversalFilter = function (item, filterSelect, filterValue) {
    if (item.offer[filterSelect] === filterValue || filterValue === 'any') {
      return true;
    } else if (typeof filterValue === 'string') {
      return parseInt(filterValue, 10) === item.offer[filterSelect];
    }
    return false;
  };

  var filterByPrice = function (item, filterValue) {
    if (filterValue === 'any') {
      return true;
    } else if (filterValue === 'low') {
      return item.offer.price < classListPrice.low;
    } else if (filterValue === 'middle') {
      return item.offer.price >= classListPrice.low && item.offer.price <= classListPrice.high;
    } else if (filterValue === 'high') {
      return item.offer.price > classListPrice.high;
    }
    return false;
  };

  var filterByFeatures = function (item) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (!item.offer.features.includes(checkedFeatures[i].value)) {
        return false;
      }
    }
    return true;
  };

  var changePins = window.debounce(function () {
    var array = [];
    // скрыть открытую карточку объявления
    window.card.close();
    // удаляем все пины
    window.map.deleteAllPins();
    for (var i = 0; i < window.pin.pins().length; i++) {
      if (selectUniversalFilter(window.pin.pins()[i], filtersByHousing.TYPE, filterType.value) &&
        filterByPrice(window.pin.pins()[i], filterPrice.value) &&
        selectUniversalFilter(window.pin.pins()[i], filtersByHousing.ROOMS, filterRoom.value) &&
        selectUniversalFilter(window.pin.pins()[i], filtersByHousing.GUESTS, filterGuest.value) &&
        filterByFeatures(window.pin.pins()[i])
      ) {
        array.push(window.pin.pins()[i]);
      }

      if (array.length === window.constants.MAX_ARRAY_LENGTH) {
        break;
      }
    }

    window.map.drawPins(array);
  });

  var filterChangeHandler = function (evt) {
    changePins(evt);
  };

  mapFilters.addEventListener('change', filterChangeHandler);
})();
