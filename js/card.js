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
    if (!pin.offer.title) {
      cardElement.querySelector('.popup__title').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    }
  };

  var addAdressToCard = function (cardElement, pin) {
    if (!pin.offer.address) {
      cardElement.querySelector('.popup__text--address').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    }
  };

  var addPriceToCard = function (cardElement, pin) {
    if (!pin.offer.price) {
      cardElement.querySelector('.popup__text--price').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    }
  };

  var addTypeToCard = function (cardElement, pin) {
    if (!pin.offer.type) {
      cardElement.querySelector('.popup__type').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__type').textContent = classListType[pin.offer.type];
    }
  };

  var addRoomsAndGuestsToCard = function (cardElement, pin) {
    var offerRooms = pin.offer.rooms;
    var offerGuests = pin.offer.guests;

    if (!offerRooms || !offerGuests) {
      cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
    } else {

      var roomsText = ' комнаты для ';
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
    }
  };

  var addCheckToCard = function (cardElement, pin) {
    if (!pin.offer.checkin || !pin.offer.checkout) {
      cardElement.querySelector('.popup__text--time').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    }
  };

  var addFeatureToCard = function (cardElement, pin) {
    if (!pin.offer.features.length) {
      cardElement.querySelector('.popup__features').classList.add('hidden');
    } else {
      var popupFeature = cardElement.querySelectorAll('.popup__feature');
      var flag = false;
      var Array = '';
      popupFeature.forEach(function (itemList) {
        flag = false;
        pin.offer.features.forEach(function (item) {
          Array = new RegExp(item).test(itemList.className);
          if (Array) {
            flag = true;
          }
        });

        if (!flag) {
          cardElement.querySelector('.popup__features').removeChild(itemList);
        }
      });
    }
  };

  var addDescriptionToCard = function (cardElement, pin) {
    if (!pin.offer.description) {
      cardElement.querySelector('.popup__description').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    }
  };

  var addPhotosToCard = function (cardElement, pin) {
    if (!pin.offer.photos.length) {
      cardElement.querySelector('.popup__photo').classList.add('hidden');
    } else {
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
    }
  };

  var addAvatarToCard = function (cardElement, pin) {
    if (!pin.author.avatar) {
      cardElement.querySelector('.popup__avatar').classList.add('hidden');
    } else {
      cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
    }
  };

  var popupEscHendler = function (evt) {
    if (evt.key === window.constants.Key.ESC) {
      window.card.closeMapCard();
    }
  };

  // Открыть карточку объявления
  var openMapCard = function (numberPin) {
    fragmentCard.appendChild(window.card.cardPreview(window.pin.pinsCopy[numberPin]));

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
      if (evt.key === window.constants.Key.ENTER) {
        window.card.closeMapCard();
      }
    });

    document.addEventListener('keydown', popupEscHendler);
  };

  var addClassMapPinActive = function (item) {
    item.classList.add('map__pin--active');
  };

  var removeClassMapPinActive = function (item) {
    item.classList.remove('map__pin--active');
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

      return cardElement;
    },

    interactionPinHandler: function (evt) {
      // Открытие карточки объявления
      if (evt.target && evt.target.closest('button[type="button"]')) {
        window.card.closeMapCard();

        if (evt.target.src) {
          addClassMapPinActive(evt.target.closest('button[type="button"]'));
          var numberPin = parseInt(evt.target.dataset.number, 10);
        } else {
          addClassMapPinActive(evt.target);
          numberPin = parseInt(evt.target.children[0].dataset.number, 10);
        }

        openMapCard(numberPin);
      }
    },

    // Закрыть карточку объявления
    closeMapCard: function () {
      var pinsList = mapBlock.querySelectorAll('.map__pin');
      pinsList.forEach(function (item) {
        if (item.classList.contains('map__pin--active')) {
          removeClassMapPinActive(item);
        }
      });

      var mapCard = document.querySelector('.map__card ');
      if (mapCard) {
        mapCard.remove();
        document.removeEventListener('keydown', popupEscHendler);
      }
    },
  };
})();
