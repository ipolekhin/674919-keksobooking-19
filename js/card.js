'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var cardPreviewTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var fragmentCard = document.createDocumentFragment();

  // Словарь
  var classListType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var addTitleToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  };

  var addAdressToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  };

  var addPriceToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
  };

  var addTypeToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__type').textContent = classListType[pin.offer.type];
  };

  var addRoomsAndGuestsToCard = function (cardElement, pin) {
    var offerRooms = pin.offer.rooms;
    var roomsText = ' комнаты для ';
    var offerGuests = pin.offer.guests;
    var guestsText = ' гостей';

    if (offerRooms === 1) {
      roomsText = ' комната для ';
    } else if (offerRooms > 4) {
      roomsText = ' комнат для ';
    }

    if (offerGuests === 1) {
      guestsText = ' гостя';
    }
    cardElement.querySelector('.popup__text--capacity').textContent = offerRooms + roomsText + offerGuests + guestsText;
  };

  var addCheckToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  };

  var addFeatureToCard = function (cardElement, pin) {
    var popupFeature = cardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < popupFeature.length; i++) {
      if (!pin.offer.features[i]) {
        cardElement.querySelector('.popup__features').removeChild(popupFeature[i]);
      }
    }
  };

  var addDescriptionToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  };

  var addPhotosToCard = function (cardElement, pin) {
    var offerPhotos = pin.offer.photos;
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    for (var i = 0; i < offerPhotos.length; i++) {
      if (i > 0) {
        var ClonePopupPhoto = popupPhotos.appendChild(popupPhoto.cloneNode());
        ClonePopupPhoto.src = offerPhotos[i];
      } else {
        popupPhoto.src = offerPhotos[i];
      }
    }
  };

  var addAvatarToCard = function (cardElement, pin) {
    cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
  };

  var popupEscHendler = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      window.card.closeMapCard();
    }
  };

  // Открыть карточку объявления
  var openMapCard = function (numberPin) {
    fragmentCard.appendChild(window.card.cardPreview(window.pin.pins[numberPin]));

    // Добавляем итоговый DOM элемент fragmentCard на страницу перед блоком .map__filters-container
    mapBlock.insertBefore(fragmentCard, document.querySelector('.map__filters-container'));

    var popupClose = document.querySelector('.map__card')
      .querySelector('.popup__close');
    popupClose.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        window.card.closeMapCard();
      }
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === window.constants.ENTER_KEY) {
        window.card.closeMapCard();
      }
    });

    document.addEventListener('keydown', popupEscHendler);
  };

  window.card = {
    cardPreview: function (pin) {
      var cardElement = cardPreviewTemplate.cloneNode(true);

      addTitleToCard(cardElement, pin);
      addAdressToCard(cardElement, pin);
      addPriceToCard(cardElement, pin);
      addTypeToCard(cardElement, pin);
      addRoomsAndGuestsToCard(cardElement, pin);
      addCheckToCard(cardElement, pin);
      addFeatureToCard(cardElement, pin);
      addDescriptionToCard(cardElement, pin);
      addPhotosToCard(cardElement, pin);
      addAvatarToCard(cardElement, pin);

      // Проверка входных данных, если данных не хватает, скрываем блок
      for (var keys in pin) {
        // JSLint рекомендует проверить, что мы работаете с соответствующим типом ключа
        if (pin.hasOwnProperty(keys)) {
          if (pin[keys].length === 0 || !pin[keys]) {
            cardElement.classList.add('hidden');
          }
          for (var key in pin[keys]) {
            if (pin[keys][key].length === 0 || !pin[keys][key]) {
              cardElement.classList.add('hidden');
            }
          }
        }
      }

      return cardElement;
    },

    interactionPinHandler: function (evt) {
      // Открытие карточки объявления
      if (evt.target && evt.target.closest('button[type="button"]')) {
        if (evt.target.src) {
          var numberPin = parseInt(evt.target.dataset.number, 10);
        } else {
          numberPin = parseInt(evt.target.children[0].dataset.number, 10);
        }
        // console.log(numberPin);
        window.card.closeMapCard();
        openMapCard(numberPin);
      }
    },

    // Закрыть карточку объявления
    closeMapCard: function () {
      var mapCard = document.querySelector('.map__card ');
      if (mapCard) {
        mapCard.remove();
        document.removeEventListener('keydown', popupEscHendler);
      }
    },
  };
})();
