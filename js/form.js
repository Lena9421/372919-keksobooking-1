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
  var inputs = noticeForm.querySelectorAll('.form__element input');


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


  var onSubmitSuccess = function () {
    deactivateForm();
    window.map.deactivate();
    window.card.remove();
  };


  var activateForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  var deactivateForm = function () {
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

  var onInputChange = function (evt) {
    if (evt.target.checkValidity()) {
      evt.target.classList.remove('field-error');
    }
  };

  inputs.forEach(function (input) {
    input.addEventListener('change', onInputChange);
  });


  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.classList.add('field-error');
  }, true);

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(noticeForm), onSubmitSuccess, window.backend.onError);
  });


  window.form = {
    activate: activateForm,
    setAddress: setAddress
  };
})();
