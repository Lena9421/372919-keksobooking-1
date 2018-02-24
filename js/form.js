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
  var roomToGuest = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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
    window.synchronizeFields(apartmentType, pricePerNight, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);
  });
  var setAddress = function (x, y) {
    addressField.value = x + ', ' + y;
  };
  var onLoad = function () {
    deActivateForm();
    window.map.deactivate();
    window.card.remove();
  };

  var onError = function (message) {
    // console.error(message);
  };
  noticeForm.addEventListener('invalid', function (evt) {
    var invalidField = evt.target;
    invalidField.style.border = '2px dashed red';
  }, true);

  // 1.5. При успешной отправке формы, страница переходит в изначальное неактивное состояние:
  // все заполненные поля стираются, +
  // метки похожих объявлений и карточка активного объявления удаляются,+
  //   метка адреса возвращается в исходное положение,
  // значение поля адреса корректируется соответственно положению метки.
  var deActivateForm = function () {
    noticeForm.classList.add('notice__form--disabled');
    noticeForm.reset();
    formElements.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), onLoad, onError);
  });
  window.form = {
    activate: activateForm,
    setAddress: setAddress
  };
})();
