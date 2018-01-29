'use strict';

exports.__esModule = true;
exports.getSelectedSkuValues = exports.getSkuComb = exports.isAllSelected = exports.normalizeSkuTree = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  normalize sku tree

  [
    {
      count: 2,
      k: "品种", // 规格名称 skuKeyName
      k_id: "1200", // skuKeyId
      k_s: "s1" // skuKeyStr
      v: [ // skuValues
        { // skuValue
          id: "1201", // skuValueId
          name: "萌" // 具体的规格值 skuValueName
        }, {
          id: "973",
          name: "帅"
        }
      ]
    },
    ...
  ]
                |
                v
  {
    s1: [{
      id: "1201",
      name: "萌"
    }, {
      id: "973",
      name: "帅"
    }],
    ...
  }
 */
var normalizeSkuTree = exports.normalizeSkuTree = function normalizeSkuTree(skuTree) {
  var normalizedTree = {};
  skuTree.forEach(function (treeItem) {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};

// 判断是否所有的sku都已经选中
var isAllSelected = exports.isAllSelected = function isAllSelected(skuTree, selectedSku) {
  // 筛选selectedSku对象中key值不为空的值
  var selected = (0, _keys2.default)(selectedSku).filter(function (skuKeyStr) {
    return selectedSku[skuKeyStr] !== '';
  });
  return skuTree.length === selected.length;
};

// 根据已选择的sku获取skuComb
var getSkuComb = exports.getSkuComb = function getSkuComb(skuList, selectedSku) {
  var skuComb = skuList.filter(function (skuComb) {
    return (0, _keys2.default)(selectedSku).every(function (skuKeyStr) {
      return String(skuComb[skuKeyStr]) === String(selectedSku[skuKeyStr]); // eslint-disable-line
    });
  })[0];
  return skuComb;
};

// 获取已选择的sku名称
var getSelectedSkuValues = exports.getSelectedSkuValues = function getSelectedSkuValues(skuTree, selectedSku) {
  var normalizedTree = normalizeSkuTree(skuTree);
  return (0, _keys2.default)(selectedSku).reduce(function (selectedValues, skuKeyStr) {
    var skuValues = normalizedTree[skuKeyStr];
    var skuValueId = selectedSku[skuKeyStr];

    if (skuValueId) {
      var skuValue = skuValues.filter(function (skuValue) {
        return skuValue.id === skuValueId;
      })[0];
      skuValue && selectedValues.push(skuValue);
    }
    return selectedValues;
  }, []);
};

var SkuHelper = {
  normalizeSkuTree: normalizeSkuTree,
  isAllSelected: isAllSelected,
  getSkuComb: getSkuComb,
  getSelectedSkuValues: getSelectedSkuValues
};
exports.default = SkuHelper;