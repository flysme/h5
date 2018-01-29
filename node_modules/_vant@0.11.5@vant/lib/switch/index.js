'use strict';

exports.__esModule = true;

var _components;

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "van-switch", class: ["van-switch--" + (_vm.value ? 'on' : 'off'), { 'van-switch--disabled': _vm.disabled }], on: { "click": _vm.toggleState } }, [_c('div', { staticClass: "van-switch__node van-hairline-surround" }, [_vm.loading ? _c('van-loading', { staticClass: "van-switch__loading" }) : _vm._e()], 1), _c('div', { staticClass: "van-switch__bg" })]);
  },

  name: 'van-switch',

  components: (_components = {}, _components[_loading2.default.name] = _loading2.default, _components),

  props: {
    value: Boolean,
    loading: Boolean,
    disabled: Boolean
  },

  methods: {
    toggleState: function toggleState() {
      if (!this.disabled && !this.loading) {
        this.$emit('input', !this.value);
        this.$emit('change', !this.value);
      }
    }
  }
};