'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var formElements = noticeForm.querySelectorAll('.form__element');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.getElementById('type');
  var pricePerNight = document.getElementById('price');
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
  // var syncTypeAndMinPrice = function () {
  //   pricePerNight.min = typeToPrice[apartmentType.value];
  // };

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

  var syncValues = function (element, elementValue) {
    element.value = elementValue;
  };
  checkinTime.addEventListener('change', function () {
    window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });
  checkoutTime.addEventListener('change', function () {
    window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });
  var syncValueWithMin = function (element, elementValue) {
    element.min = elementValue;
  };
  apartmentType.addEventListener('change', function () {
    window.synchronizeFields(apartmentType, pricePerNight, ['flat,'house', 'palace'], [1000, 5000, 10000], syncValueWithMin);
  });

  var onLoad = function (data) {
    console.log(data);
  };
  var onError = function (message) {
    // document.map.element.insertAdjacentHTML('afterend', '<div id="message">message</div>');
    console.error(message);
  };
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var invalidField = evt.target;
    invalidField.style.borderColor = 'blue';
    window.upLoad(new FormData(noticeForm), onLoad, onError);
  }, true);

  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.style.borderColor = 'red';
  }, true);

  window.form = {
    activate: activateForm,
    addressField: addressField
  };
})();
