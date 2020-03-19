'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFeaturesList;
  var classListPrice = {
    'low': 10000,
    'high': 50000,
  };

  var filterHousing = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
  };

  var filterByType = function (data, select) {
    window.pin.pinsCopy = data
      .filter(function (item) {
        if (select === 'any') {
          return item;
        }
        return item.offer.type === select;
      });
  };

  var filterByPrice = function (data, select) {
    window.pin.pinsCopy = data.filter(function (item) {
      if (select === 'any') {
        return item;
      } else if (select === 'low') {
        return item.offer.price < classListPrice.low;
      } else if (select === 'middle') {
        return item.offer.price >= classListPrice.low && item.offer.price <= classListPrice.high;
      } else if (select === 'high') {
        return item.offer.price > classListPrice.high;
      }
      return item;
    });
  };

  var filterByRooms = function (data, select) {
    window.pin.pinsCopy = data
      .filter(function (item) {
        if (select === 'any') {
          return item;
        }
        return item.offer.rooms === parseInt(select, 10);
      });
  };

  var filterByGuests = function (data, select) {
    window.pin.pinsCopy = data
      .filter(function (item) {
        if (select === 'any') {
          return item;
        }
        return item.offer.guests === parseInt(select, 10);
      });
  };

  var filterByFeatures = function (data) {
    var checkboxList = [];

    mapFeaturesList = mapFilters.querySelectorAll('input:checked');
    mapFeaturesList.forEach(function (item) {
      checkboxList.push(item.value);
    });

    if (checkboxList.length > 0) {
      checkboxList.forEach(function (check) {
        window.pin.pinsCopy = data
          .filter(function (item) {
            return item.offer.features.includes(check);
          });
      });
    }
  };

  var changePins = window.debounce(function (evt) {
    // скрыть открытую карточку объявления
    window.card.closeMapCard();
    // удаляем все пины
    window.map.deleteAllPins();

    window.pin.pinsCopy = window.pin.pins.map(function (list) {
      return list;
    });

    filterHousing[evt.target.id] = evt.target.value;

    filterByType(window.pin.pinsCopy, filterHousing['housing-type']);
    filterByPrice(window.pin.pinsCopy, filterHousing['housing-price']);
    filterByRooms(window.pin.pinsCopy, filterHousing['housing-rooms']);
    filterByGuests(window.pin.pinsCopy, filterHousing['housing-guests']);

    if (evt.target.matches('input[type="checkbox"]')) {
      filterByFeatures(window.pin.pinsCopy, evt);
    }

    window.map.createPins(window.pin.pinsCopy);
  });

  var filterChangeHandler = function (evt) {
    changePins(evt);
  };

  mapFilters.addEventListener('change', filterChangeHandler);
})();
