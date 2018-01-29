"use strict";

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-swipe-item", style: _vm.style }, [_vm._t("default")], 2);
  },

  name: 'van-swipe-item',

  data: function data() {
    return {
      offset: 0
    };
  },


  computed: {
    style: function style() {
      return {
        width: this.$parent.width + 'px',
        transform: "translate3d(" + this.offset + "px, 0, 0)"
      };
    }
  },

  beforeCreate: function beforeCreate() {
    this.$parent.swipes.push(this);
  },
  destroyed: function destroyed() {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  }
};