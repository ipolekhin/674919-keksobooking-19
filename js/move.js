'use strict';

(function () {
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

        var onMouseMove = function (evt) {
          evt.preventDefault();
          window.form.fillInputAdress(window.map.getCoordinateOfPin(true));

          var shift = {
            x: startCoords.x - evt.clientX,
            y: startCoords.y - evt.clientY
          };

          var shiftTop = (pin.offsetTop - shift.y);
          var shiftLeft = (pin.offsetLeft - shift.x);

          startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };
          if (shiftTop < window.constants.BORDER_TOP) {
            shiftTop = window.constants.BORDER_TOP;
          } else if (shiftTop > window.constants.BORDER_BOTTOM) {
            shiftTop = window.constants.BORDER_BOTTOM;
          }

          if (shiftLeft < window.constants.BORDER_LEFT) {
            shiftLeft = window.constants.BORDER_LEFT;
          } else if (shiftLeft > window.constants.BORDER_RIGHT - window.constants.WIDTH_MAIN_PIN) {
            shiftLeft = window.constants.BORDER_RIGHT - window.constants.WIDTH_MAIN_PIN;
          }

          pin.style.top = shiftTop + 'px';
          pin.style.left = shiftLeft + 'px';
        };

        var onMouseUp = function (evt) {
          evt.preventDefault();
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
