'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToastrBox = require('./ToastrBox');

var _ToastrBox2 = _interopRequireDefault(_ToastrBox);

var _ToastrConfirm = require('./ToastrConfirm');

var _ToastrConfirm2 = _interopRequireDefault(_ToastrConfirm);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _toastrEmitter = require('./toastrEmitter');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ReduxToastr = function (_Component) {
  _inherits(ReduxToastr, _Component);

  function ReduxToastr(props) {
    _classCallCheck(this, ReduxToastr);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.toastrFired = {};

    (0, _utils.updateConfig)(_config2.default, _this.props);
    (0, _utils._bind)('_addToMemory', _this);
    return _this;
  }

  ReduxToastr.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        add = _props.add,
        showConfirm = _props.showConfirm,
        clean = _props.clean,
        removeByType = _props.removeByType;

    _toastrEmitter.EE.on('toastr/confirm', showConfirm);
    _toastrEmitter.EE.on('add/toastr', add);
    _toastrEmitter.EE.on('clean/toastr', clean);
    _toastrEmitter.EE.on('removeByType/toastr', removeByType);
  };

  ReduxToastr.prototype.componentWillUnmount = function componentWillUnmount() {
    _toastrEmitter.EE.removeListener('toastr/confirm');
    _toastrEmitter.EE.removeListener('add/toastr');
    _toastrEmitter.EE.removeListener('clean/toastr');
    _toastrEmitter.EE.removeListener('removeByType/toastr');
    this.toastrFired = {};
  };

  ReduxToastr.prototype._addToMemory = function _addToMemory(id) {
    this.toastrFired[id] = true;
  };

  ReduxToastr.prototype._renderToastrBox = function _renderToastrBox(item) {
    // Default options from props, but item can override them with own.
    var mergedItem = _extends({}, item, {
      options: _extends({
        progressBar: this.props.progressBar,
        transitionIn: this.props.transitionIn,
        transitionOut: this.props.transitionOut
      }, item.options)
    });

    return _react2.default.createElement(_ToastrBox2.default, _extends({
      key: item.id,
      inMemory: this.toastrFired,
      addToMemory: this._addToMemory,
      item: mergedItem
    }, this.props));
  };

  ReduxToastr.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('redux-toastr', this.props.position, this.props.className) },
      this.props.toastr.confirm && _react2.default.createElement(_ToastrConfirm2.default, _extends({
        key: this.props.toastr.confirm.id,
        confirm: this.props.toastr.confirm
      }, this.props)),
      this.props.toastr && this.props.toastr.toastrs.map(function (item) {
        return _this2._renderToastrBox(item);
      })
    );
  };

  return ReduxToastr;
}(_react.Component);

ReduxToastr.displayName = 'ReduxToastr';
ReduxToastr.propTypes = {
  toastr: _react.PropTypes.object,
  options: _react.PropTypes.object,
  position: _react.PropTypes.string,
  newestOnTop: _react.PropTypes.bool,
  timeOut: _react.PropTypes.number,
  confirmOptions: _react.PropTypes.object,
  progressBar: _react.PropTypes.bool,
  transitionIn: _react.PropTypes.string,
  transitionOut: _react.PropTypes.string,
  preventDuplicates: _react.PropTypes.bool
};
ReduxToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  progressBar: false,
  transitionIn: 'bounceIn',
  transitionOut: 'bounceOut',
  preventDuplicates: false,
  confirmOptions: {
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutUp',
    okText: 'ok',
    cancelText: 'cancel',
    disableCancel: false
  }
};
exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    toastr: state.toastr ? state.toastr : state.get('toastr')
  };
}, actions)(ReduxToastr);