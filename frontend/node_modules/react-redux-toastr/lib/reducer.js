'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toastrsCache = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils.js');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// We will cache data so we can check for duplicated before fire the add action.
var toastrsCache = exports.toastrsCache = [];

var initialState = {
  toastrs: [],
  confirm: null
};

exports.default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _constants.ADD_TOASTR, function (state, _ref) {
  var type = _ref.type,
      title = _ref.title,
      message = _ref.message,
      options = _ref.options,
      ignoreToastr = _ref.ignoreToastr;

  if (ignoreToastr) {
    return state;
  }

  var newToastr = {
    id: (0, _utils.guid)(),
    type: type,
    title: title,
    message: message,
    options: options
  };

  var newState = {};
  if (!_config2.default.newestOnTop) {
    newState = _extends({}, state, {
      toastrs: [].concat(_toConsumableArray(state.toastrs), [newToastr])
    });
  } else {
    newState = _extends({}, state, {
      toastrs: [newToastr].concat(_toConsumableArray(state.toastrs))
    });
  }
  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_TOASTR, function (state, id) {
  var newState = _extends({}, state, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.id !== id;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_BY_TYPE, function (state, type) {
  var newState = _extends({}, state, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.type !== type;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.CLEAN_TOASTR, function (state) {
  exports.toastrsCache = toastrsCache = [];
  return _extends({}, state, {
    toastrs: []
  });
}), _defineProperty(_createReducer, _constants.SHOW_CONFIRM, function (state, _ref2) {
  var message = _ref2.message,
      options = _ref2.options;

  return _extends({}, state, {
    confirm: {
      id: (0, _utils.guid)(),
      show: true,
      message: message,
      options: options || {}
    }
  });
}), _defineProperty(_createReducer, _constants.HIDE_CONFIRM, function (state) {
  return _extends({}, state, {
    confirm: null
  });
}), _createReducer));