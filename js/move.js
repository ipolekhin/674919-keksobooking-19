'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');

  window.move = {
    mainPin: function () {
      var moveHandler = function (evt) {
        evt.preventDefault();

        if (evt.button === 0) {
          var startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };
        }

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          window.form.fillInputAdress(window.map.getCoordinateOfPin(true));

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          var shiftTop = (pin.offsetTop - shift.y);
          var shiftLeft = (pin.offsetLeft - shift.x);

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };
          if (shiftTop < 130) {
            shiftTop = 130;
          } else if (shiftTop > 630) {
            shiftTop = 630;
          }

          if (shiftLeft < 0) {
            shiftLeft = 0;
          } else if (shiftLeft > mapBlock.offsetWidth - pin.offsetWidth) {
            shiftLeft = mapBlock.offsetWidth - pin.offsetWidth;
          }

          pin.style.top = shiftTop + 'px';
          pin.style.left = shiftLeft + 'px';
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          window.form.fillInputAdress(window.map.getCoordinateOfPin(true));

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      pin.addEventListener('mousedown', moveHandler);
    },
  };
})();
