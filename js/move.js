'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    if (evt.button === 0) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
    }

    var mouseMoveHandler = function (mouseMoveEvent) {
      mouseMoveEvent.preventDefault();
      dragged = true;
      window.form.fillInputAddress(window.map.getCoordinateOfPin(true));

      var shift = {
        x: startCoords.x - mouseMoveEvent.clientX,
        y: startCoords.y - mouseMoveEvent.clientY
      };

      var shiftTop = (pin.offsetTop - shift.y);
      var shiftLeft = (pin.offsetLeft - shift.x);

      startCoords = {
        x: mouseMoveEvent.clientX,
        y: mouseMoveEvent.clientY
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

    var mouseUpHandler = function (mouseUpEvent) {
      mouseUpEvent.preventDefault();

      window.form.fillInputAddress(window.map.getCoordinateOfPin(true));

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (!dragged && mapBlock.classList.contains('map--faded') && mouseUpEvent.button === 0) {
        window.map.activationPage();
        pin.removeEventListener('keydown', window.map.activationClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
