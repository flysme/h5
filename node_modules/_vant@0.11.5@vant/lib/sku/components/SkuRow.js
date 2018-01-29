'use strict';

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-sku-row" }, [_c('div', { staticClass: "van-sku-row__title" }, [_vm._v(_vm._s(_vm.skuRow.k) + "：")]), _c('div', { staticClass: "van-sku-row__items" }, [_vm._t("default")], 2)]);
  },

  name: 'van-sku-row',

  props: {
    skuRow: Object
  }
};