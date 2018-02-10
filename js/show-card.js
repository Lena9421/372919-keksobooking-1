'use strict';
// результат вызова getCard вставляем в блок map перед классом '.map__filters-container'
(function () {
  var showCard = function (offer) {
    window.card.remove();
    window.map.insertElement(window.card.get(offer)); // вызываем функцию insertElement
  };
  window.showCard = {
    show: showCard
  };
})();
