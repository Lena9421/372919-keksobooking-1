'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var resetButton = noticeForm.querySelector('.form__reset');
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

  var onSubmitSuccess = function () {
    deactivateForm();
    window.map.deactivate();
    window.card.remove();
  };

  var onCheckInChange = function () {
    window.synchronizeFields(checkinTime, checkoutTime, checkinArray, checkinArray, syncValues);
  };

  var onCheckOutChange = function () {
    window.synchronizeFields(checkoutTime, checkinTime, checkoutArray, checkinArray, syncValues);
  };

  var onApartmentChange = function () {
    window.synchronizeFields(apartmentType, pricePerNight, apartmentArray, apartmentPrices, syncValueWithMin);
  };

  var onInputChange = function (evt) {
    if (evt.target.checkValidity()) {
      evt.target.classList.remove('field-error');
    }
  };

  var onInvalidForm = function (evt) {
    var invalidField = evt.target;
    invalidField.classList.add('field-error');
  };

  var onSubmitForm = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(noticeForm), onSubmitSuccess, window.backend.onError);
  };

  var onResetButtonClick = function () {
    deactivateForm();
    window.map.deactivate();
  };

  var activateForm = function () {
    noticeForm.classList.remove('notice__form--disabled');

    checkinTime.addEventListener('change', onCheckInChange);
    checkoutTime.addEventListener('change', onCheckOutChange);
    apartmentType.addEventListener('change', onApartmentChange);
    numberOfRooms.addEventListener('change', syncRoomAndGuests);

    inputs.forEach(function (input) {
      input.addEventListener('change', onInputChange);
    });

    syncRoomAndGuests();

    noticeForm.addEventListener('invalid', onInvalidForm, true);
    noticeForm.addEventListener('submit', onSubmitForm);
    resetButton.addEventListener('click', onResetButtonClick);

    window.photo.activate();

    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var deactivateForm = function () {
    noticeForm.classList.add('notice__form--disabled');
    noticeForm.reset();

    checkinTime.removeEventListener('change', onCheckInChange);
    checkoutTime.removeEventListener('change', onCheckOutChange);
    apartmentType.removeEventListener('change', onApartmentChange);
    numberOfRooms.removeEventListener('change', syncRoomAndGuests);
    resetButton.removeEventListener('click', onResetButtonClick);

    inputs.forEach(function (input) {
      input.removeEventListener('change', onInputChange);
    });

    syncRoomAndGuests();

    noticeForm.removeEventListener('invalid', onInvalidForm);
    noticeForm.removeEventListener('submit', onSubmitForm);

    window.photo.deactivate();

    formElements.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };

  window.form = {
    activate: activateForm,
    setAddress: setAddress
  };
})();
