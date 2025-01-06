$(document).ready(function () {
  const NOWON_CLASSNAME = 'nowOn';

  /** 모달 핸들러 START */
  const sModHandler = {
    modOn: function (clicker, modalName) {
      $(clicker).on('click', function (e) {
        $(modalName).addClass(NOWON_CLASSNAME);
        e.preventDefault();
        $(`${modalName} .modal-bg`).on(
          'scroll touchmove mousewheel',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        );
      });
    },
    modOff: function (clicker, modalName) {
      $(clicker).on('click', function (e) {
        // console.log('clicked');
        $(modalName).removeClass(NOWON_CLASSNAME);
        e.preventDefault();
        $(`${modalName} .modal-bg`).off('scroll touchmove mousewheel');
      });
    },
  };

  sModHandler.modOn('#timeSelector', '#modalTimeTable');
  // sModHandler.modOff('.btn--modal-cls button', '.modal__container');
  // sModHandler.modOff('.btn--modal-goback button', '.modal__container');
  sModHandler.modOff('.btn--modal-cls button', '#modalTimeTable');
  sModHandler.modOff('.btn--modal-goback button', '#modalTimeTable');

  sModHandler.modOn('#callPersonalPolicy', '#modalPersonalPolicy');
  sModHandler.modOff('.btn--modal-cls button', '.modal__container');
  sModHandler.modOff('.modal--foot .confirm button', '#modalPersonalPolicy');

  sModHandler.modOn('#callServicePolicy', '#modalServicePolicy');
  // sModHandler.modOff('.btn--modal-cls button', '.modal__container');
  sModHandler.modOff('.modal--foot .confirm button', '#modalServicePolicy');
  sModHandler.modOn('#callCostWzone', '#modalCostWzone');
  sModHandler.modOff('.modal--foot .confirm button', '#modalCostWzone');

  /** 모달 핸들러 END */
});
