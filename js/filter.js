'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var rangeToPrice = {
    middle: function (value) {
      return value > Price.LOW && value < Price.HIGH;
    },
    low: function (value) {
      return value <= Price.LOW;
    },
    high: function (value) {
      return value >= Price.HIGH;
    },
  };

  var filters = {
    'housing-type': function (ad) {
      return filterByValue(ad, 'type', type.value);
    },
    'housing-price': function (ad) {
      return rangeToPrice[price.value](ad.offer.price);
    },
    'housing-rooms': function (ad) {
      return filterByValue(ad, 'rooms', rooms.value);
    },
    'housing-guests': function (ad) {
      return filterByValue(ad, 'guests', guests.value);
    },
  };

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var selects = Array.prototype.slice.call(filterForm.querySelectorAll('select'));
  var features = Array.prototype.slice.call(filterForm.querySelectorAll('input[type="checkbox"]:checked'));

  var filterByValue = function (ad, dataValue, filterValue) {
    return ad.offer[dataValue].toString() === filterValue;
  };

  var filterFeatures = function (ad) {
    return features.every(function (feature) {
      return ad.offer.features.indexOf(feature.value) !== -1;
    });
  };

  var applyFilter = function (data) {
    var filteredData = data.slice();
    features = Array.prototype.slice.call(filterForm.querySelectorAll('input[type="checkbox"]:checked'));

    var activeFilters = selects.filter(function (select) {
      return select.value !== 'any';
    });

    activeFilters.forEach(function (select) {
      filteredData = filteredData.filter(filters[select.id]);
    });

    filteredData = filteredData.filter(filterFeatures);

    return filteredData;
  };

  var resetFilters = function () {
    filterForm.reset();
  };

  window.filter = {
    element: filterForm,
    apply: applyFilter,
    reset: resetFilters
  };

})();
