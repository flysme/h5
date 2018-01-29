'use strict';

exports.__esModule = true;
exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-progress" }, [_c('span', { staticClass: "van-progress__portion", style: _vm.portionStyle }), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.showPivot, expression: "showPivot" }], staticClass: "van-progress__pivot", style: _vm.pivotStyle }, [_vm._v(_vm._s(_vm.pivotText))])]);
  },

  name: 'van-progress',

  props: {
    inactive: Boolean,
    percentage: {
      type: Number,
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      }
    },
    showPivot: {
      type: Boolean,
      default: true
    },
    pivotText: {
      type: String,
      default: function _default() {
        return this.percentage + '%';
      }
    },
    color: {
      type: String,
      default: '#38f'
    },
    textColor: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    componentColor: function componentColor() {
      return this.inactive ? '#cacaca' : this.color;
    },
    pivotStyle: function pivotStyle() {
      var percentage = this.percentage;

      return {
        color: this.textColor,
        backgroundColor: this.componentColor,
        left: percentage <= 5 ? '0%' : percentage >= 95 ? '100%' : percentage + '%',
        marginLeft: percentage <= 5 ? '0' : percentage >= 95 ? '-28px' : '-14px'
      };
    },
    portionStyle: function portionStyle() {
      return {
        width: this.percentage + '%',
        backgroundColor: this.componentColor
      };
    }
  }
};