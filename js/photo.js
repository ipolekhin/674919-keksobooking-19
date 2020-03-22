'use strict';

(function () {
  var SIZE_PHOTO = '70px';
  var ALT_PHOTO = 'Фотография жилья';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhotoOfHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoOfHouse = document.querySelector('.ad-form__photo');
  var imageElementPhotoOfHouse = previewPhotoOfHouse.querySelector('img');


  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var createElement = function () {
    var newElement = document.createElement('img');
    newElement.style.width = SIZE_PHOTO;
    newElement.style.height = SIZE_PHOTO;
    newElement.alt = ALT_PHOTO;
    newElement.src = '';
    previewPhotoOfHouse.appendChild(newElement);
    imageElementPhotoOfHouse = previewPhotoOfHouse.querySelector('img');
  };

  fileChooserPhotoOfHouse.addEventListener('change', function () {
    var file = fileChooserPhotoOfHouse.files[0];
    var fileName = file.name.toLowerCase();

    if (imageElementPhotoOfHouse === null) {
      createElement();
    }

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageElementPhotoOfHouse.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
