'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');

  window.move = {
    mainPin: function () {
      var moveHandler = function (evt) {
        evt.preventDefault();
        var dragged = false;

        if (evt.button === 0) {
          var startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };
        }

        var onMouseMove = function (MouseMoveEvent) {
          MouseMoveEvent.preventDefault();
          dragged = true;
          window.form.fillInputAdress(window.map.getCoordinateOfPin(true));

          var shift = {
            x: startCoords.x - MouseMoveEvent.clientX,
            y: startCoords.y - MouseMoveEvent.clientY
          };

          var shiftTop = (pin.offsetTop - shift.y);
          var shiftLeft = (pin.offsetLeft - shift.x);

          startCoords = {
            x: MouseMoveEvent.clientX,
            y: MouseMoveEvent.clientY
          };

          if (shiftTop < window.constants.Border.TOP) {
            shiftTop = window.constants.Border.TOP;
          } else if (shiftTop > window.constants.Border.BOTTOM) {
            shiftTop = window.constants.Border.BOTTOM;
          }

          if (shiftLeft < window.constants.Border.LEFT) {
            shiftLeft = window.constants.Border.LEFT;
          } else if (shiftLeft > window.constants.Border.RIGHT - window.constants.WIDTH_MAIN_PIN) {
            shiftLeft = window.constants.Border.RIGHT - window.constants.WIDTH_MAIN_PIN;
          }

          pin.style.top = shiftTop + 'px';
          pin.style.left = shiftLeft + 'px';
        };

        var onMouseUp = function (MouseUpEvent) {
          MouseUpEvent.preventDefault();

          window.form.fillInputAdress(window.map.getCoordinateOfPin(true));

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (!dragged && mapBlock.classList.contains('map--faded')) {
            window.map.activationButtonClickHandler();
          }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      pin.addEventListener('mousedown', moveHandler);
    },
  };
})();
