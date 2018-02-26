'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var formElements = noticeForm.querySelectorAll('fieldset');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.getElementById('type');
  var pricePerNight = document.getElementById('price');
  var numberOfRooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var addressField = document.getElementById('address');

  var checkinArray = ['12:00', '13:00', '14:00'];
  var checkoutArray = ['12:00', '13:00', '14:00'];
  var apartmentArray = ['bungalo', 'flat', 'house', 'palace'];
  var apartmentPrices = [0, 1000, 5000, 10000];

  var roomToGuest = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };


  var syncValues = function (element, elementValue) {
    element.value = elementValue;
  };
  var syncValueWithMin = function (element, elementValue) {
    element.min = elementValue;
  };

  var setAddress = function (x, y) {
    addressField.value = x + ', ' + y;
  };

  var syncRoomAndGuests = function () {
    var capacityValues = roomToGuest[numberOfRooms.value];
    capacityOptions.forEach(function (item) {
      item.disabled = !capacityValues.includes(item.value);
    });
    capacity.value = capacityValues[0];
  };
  syncRoomAndGuests();


  var onLoad = function () {
    deActivateForm();
    window.map.deactivate();
    window.card.remove();
  };

  var onError = function (message) {
    var modal = document.createElement('div');
    window.map.insertElement(modal);
    modal.classList.add('modal--show');
    modal.contentText = message;

    setTimeout(function () {
      modal.remove();
    }, 1000);
  };


  var activateForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  var deActivateForm = function () {
    noticeForm.classList.add('notice__form--disabled');
    noticeForm.reset();
    formElements.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };


  checkinTime.addEventListener('change', function () {
    window.synchronizeFields(checkinTime, checkoutTime, checkinArray, checkinArray, syncValues);
  });
  checkoutTime.addEventListener('change', function () {
    window.synchronizeFields(checkoutTime, checkinTime, checkoutArray, checkinArray, syncValues);
  });
  apartmentType.addEventListener('change', function () {
    window.synchronizeFields(apartmentType, pricePerNight, apartmentArray, apartmentPrices, syncValueWithMin);
  });
  numberOfRooms.addEventListener('change', syncRoomAndGuests);


  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.style.border = '2px dashed red';
  }, true);

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(noticeForm), onLoad, onError);
  });


  window.form = {
    activate: activateForm,
    setAddress: setAddress,
    onError: onError
  };
})();
