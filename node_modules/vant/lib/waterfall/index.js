'use strict';

exports.__esModule = true;

var _directive = require('./directive.js');

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  Vue.directive('WaterfallLower', (0, _directive2.default)('lower'));
  Vue.directive('WaterfallUpper', (0, _directive2.default)('upper'));
};

_directive2.default.install = install;
exports.default = _directive2.default;