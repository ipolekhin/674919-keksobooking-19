'use strict';

(function () {
  var cardPreviewTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.card = {
    cardPreview: function (pin) {
      var cardElement = cardPreviewTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = pin.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
      var offerType = pin.offer.type;
      if (offerType === 'flat') {
        offerType = 'Квартира';
      } else if (offerType === 'bungalo') {
        offerType = 'Бунгало';
      } else if (offerType === 'house') {
        offerType = 'Дом';
      } else {
        offerType = 'Дворец';
      }
      cardElement.querySelector('.popup__type').textContent = offerType;
      var offerRooms = pin.offer.rooms;
      var roomsText = ' комнаты для ';
      if (offerRooms === 1) {
        roomsText = ' комната для ';
      } else if (offerRooms >= 4) {
        roomsText = ' комнат для ';
      }
      var offerGuests = pin.offer.guests;
      var guestsText = ' гостей';
      if (offerGuests === 1) {
        guestsText = ' гостя';
      }
      cardElement.querySelector('.popup__text--capacity').textContent = offerRooms + roomsText + offerGuests + guestsText;
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
      var popupFeature = cardElement.querySelectorAll('.popup__feature');
      for (var i = 0; i < popupFeature.length; i++) {
        if (!pin.offer.features[i]) {
          cardElement.querySelector('.popup__features').removeChild(popupFeature[i]);
        }
      }
      cardElement.querySelector('.popup__description').textContent = pin.offer.description;
      var offerPhotos = pin.offer.photos;
      var popupPhotos = cardElement.querySelector('.popup__photos');
      var popupPhoto = popupPhotos.querySelector('.popup__photo');
      for (var j = 0; j < offerPhotos.length; j++) {
        if (j > 0) {
          var ClonePopupPhoto = popupPhotos.appendChild(popupPhoto.cloneNode());
          ClonePopupPhoto.src = offerPhotos[j];
        } else {
          popupPhoto.src = offerPhotos[j];
        }
      }

      cardElement.querySelector('.popup__avatar').src = pin.author.avatar;
      // Для теста нулевых данных
      // pin.author.avatar = 0;
      // pin.offer.price = 0;
      // pin.offer.photos = [];

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
  };
})();
