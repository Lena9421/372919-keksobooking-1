'use strict';
(function () {

  var showCard = function (offer) {
    window.card.remove();
    window.map.insertElement(window.card.get(offer));
  };

  window.showCard = {
    show: showCard
  };

})();
