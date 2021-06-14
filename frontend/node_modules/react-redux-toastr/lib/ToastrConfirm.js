'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _utils = require('./utils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ENTER = 13;
var ESC = 27;

var ToastrConfirm = function (_Component) {
  _inherits(ToastrConfirm, _Component);

  function ToastrConfirm(props) {
    _classCallCheck(this, ToastrConfirm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var _this$props = _this.props,
        confirmOptions = _this$props.confirmOptions,
        confirm = _this$props.confirm;
    var _confirm$options = confirm.options,
        okText = _confirm$options.okText,
        cancelText = _confirm$options.cancelText,
        transitionIn = _confirm$options.transitionIn,
        transitionOut = _confirm$options.transitionOut,
        disableCancel = _confirm$options.disableCancel;


    _this.okText = okText || confirmOptions.okText;
    _this.cancelText = cancelText || confirmOptions.cancelText;
    _this.transitionIn = transitionIn || confirmOptions.transitionIn;
    _this.transitionOut = transitionOut || confirmOptions.transitionOut;
    _this.disableCancel = disableCancel != null ? disableCancel : confirmOptions.disableCancel;
    (0, _utils._bind)('setTransition removeConfirm handleOnKeyUp handleOnKeyDown', _this);
    _this.isKeyDown = false;
    return _this;
  }

  ToastrConfirm.prototype.componentDidMount = function componentDidMount() {
    this.isHiding = false;
    this.hasClicked = false;
    this.confirmHolder.focus();

    if (this.props.confirm.show) {
      this.setTransition(true);
    }
  };

  ToastrConfirm.prototype.handleOnKeyDown = function handleOnKeyDown(e) {
    if ((0, _utils.keyCode)(e) == ENTER) {
      e.preventDefault();
    }
    this.isKeyDown = true;
  };

  ToastrConfirm.prototype.handleConfirmClick = function handleConfirmClick() {
    var _this2 = this;

    if (this.hasClicked) return;
    this.hasClicked = true;

    var options = this.props.confirm.options;

    var onAnimationEnd = function onAnimationEnd() {
      _this2.removeConfirm();
      if (options && options.onOk) {
        options.onOk();
      }
    };

    this.setTransition();
    (0, _utils.onCSSTransitionEnd)(this.confirm, onAnimationEnd);
  };

  ToastrConfirm.prototype.handleCancelClick = function handleCancelClick() {
    var _this3 = this;

    if (this.hasClicked) return;
    this.hasClicked = true;

    var options = this.props.confirm.options;

    var onAnimationEnd = function onAnimationEnd() {
      _this3.removeConfirm();
      if (options && options.onCancel) {
        options.onCancel();
      }
    };

    this.setTransition();
    (0, _utils.onCSSTransitionEnd)(this.confirm, onAnimationEnd);
  };

  ToastrConfirm.prototype.setTransition = function setTransition(add) {
    var body = document.querySelector('body');

    if (add) {
      this.isHiding = false;
      _CSSCore2.default.addClass(body, 'toastr-confirm-active');
      _CSSCore2.default.addClass(this.confirm, this.transitionIn);
      return;
    }

    this.isHiding = true;
    _CSSCore2.default.addClass(this.confirm, this.transitionOut);
  };

  ToastrConfirm.prototype.removeConfirm = function removeConfirm() {
    this.isHiding = false;
    this.props.hideConfirm();
    var body = document.querySelector('body');
    _CSSCore2.default.removeClass(body, 'toastr-confirm-active');
  };

  ToastrConfirm.prototype.handleOnKeyUp = function handleOnKeyUp(e) {
    var code = (0, _utils.keyCode)(e);
    if (code == ESC && !this.disableCancel) {
      this.handleCancelClick();
    } else if (code == ESC && this.disableCancel) {
      this.handleConfirmClick();
    } else if (code == ENTER && this.isKeyDown) {
      this.isKeyDown = false;
      this.handleConfirmClick();
    }
  };

  ToastrConfirm.prototype.render = function render() {
    var _this4 = this;

    return _react2.default.createElement(
      'div',
      {
        className: 'confirm-holder',
        tabIndex: '-1',
        ref: function ref(_ref2) {
          return _this4.confirmHolder = _ref2;
        },
        onKeyDown: this.handleOnKeyDown,
        onKeyUp: this.handleOnKeyUp
      },
      _react2.default.createElement(
        'div',
        { className: 'confirm animated', ref: function ref(_ref) {
            return _this4.confirm = _ref;
          } },
        _react2.default.createElement(
          'div',
          { className: 'message' },
          this.props.confirm.message
        ),
        _react2.default.createElement(
          _Button2.default,
          { className: this.disableCancel ? 'full-width' : '', onClick: this.handleConfirmClick.bind(this) },
          this.okText
        ),
        this.disableCancel ? null : _react2.default.createElement(
          _Button2.default,
          { onClick: this.handleCancelClick.bind(this) },
          this.cancelText
        )
      ),
      _react2.default.createElement('div', { className: 'shadow' })
    );
  };

  return ToastrConfirm;
}(_react.Component);

ToastrConfirm.displayName = 'ToastrConfirm';
ToastrConfirm.propTypes = {
  confirm: _react.PropTypes.object.isRequired
};

exports.default = ToastrConfirm;