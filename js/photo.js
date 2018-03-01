'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PHOTO_MAX_WIDTH = '250';
  var AVATAR_PLACEHOLDER = 'img/muffin.png';

  var fileInputs = document.querySelectorAll('input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoPreview = document.querySelector('.form__photo-container');

  var imageInserting = {
    'avatar': function (imageSource) {
      avatarPreview.src = imageSource;
    },
    'images': function (imageSource) {
      var image = document.createElement('img');
      image.src = imageSource;
      image.width = PHOTO_MAX_WIDTH;
      photoPreview.appendChild(image);
    }
  };

  var onInputChange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name;

    // check, if selected file is an image
    var isTypeCorrect = FILE_TYPES.some(function (type) {
      var regex = new RegExp('.+\\.' + type);
      return regex.test(fileName.toLowerCase());
    });

    if (isTypeCorrect) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageInserting[evt.target.id](reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  fileInputs[0].name = 'avatar';
  fileInputs[1].name = 'images';

  var activatePhotos = function() {
    fileInputs.forEach(function (input) {
      input.accept = '.gif, .jpg, .jpeg, .png';
      input.addEventListener('change', onInputChange);
    });
  };

  var deactivatePhotos = function() {
    fileInputs.forEach(function (input) {
      input.removeEventListener('change', onInputChange);
      avatarPreview.src = AVATAR_PLACEHOLDER;
      photoPreview.innerHTML = '';
    });
  };

  window.photo = {
    activate: activatePhotos,
    deactivate: deactivatePhotos
  }
})();
