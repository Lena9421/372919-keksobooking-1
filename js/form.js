'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var formElements = noticeForm.querySelectorAll('.form__element');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var typeOfApartment = document.getElementById('type');
  var minPriceOfAp = document.getElementById('price');
  var numberOfRooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var addressField = document.getElementById('address');
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomToGuest = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var equateInOutTime = function () {
    timeoutSelect.value = timeinSelect.value;
  };
  var equateOutInTime = function () {
    timeinSelect.value = timeoutSelect.value;
  };

  var syncTypeAndMinPrice = function () {
    minPriceOfAp.min = typeToPrice[typeOfApartment.value];
  };

  var syncRoomAndGuests = function () {
    var capacityValues = roomToGuest[numberOfRooms.value];
    capacityOptions.forEach(function (item) { // запускаем цикл по массиву capacityOptions(2-й селект)
      item.disabled = !capacityValues.includes(item.value);
    });
    capacity.value = capacityValues[0];
  };
  var activateForm = function () {
    noticeForm.classList.remove('notice__form--disabled');
    formElements.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };
  syncRoomAndGuests();
  numberOfRooms.addEventListener('change', syncRoomAndGuests);
  typeOfApartment.addEventListener('change', syncTypeAndMinPrice);
  timeinSelect.addEventListener('change', equateInOutTime);
  timeoutSelect.addEventListener('change', equateOutInTime);
  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.style.borderColor = 'red';
  }, true);
  window.form = {
    activate: activateForm,
    addressField: addressField
  };
})();
