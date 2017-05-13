webpackJsonp([0,1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputFileComponent = function () {
  /** @ngInject */
  InputFileComponent.$inject = ["$timeout", "$element", "$attrs"];
  function InputFileComponent($timeout, $element, $attrs) {
    _classCallCheck(this, InputFileComponent);

    this.$timeout = $timeout;
    this.$element = $element;
    this.$attrs = $attrs;
  }

  _createClass(InputFileComponent, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      var inputElement = this.$element[0].getElementsByTagName('input')[0];

      // If there is a multiple attribute different than "false"
      if (this.$attrs.multiple !== 'false' && (this.$attrs.multiple === '' || this.$attrs.multiple)) {
        inputElement.setAttribute('multiple', '');
      }
      inputElement.addEventListener('change', function (event) {
        return _this.onInputChange(event);
      }, false);
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(event) {
      var _this2 = this;

      var files = event.target.files;
      this.ngModel = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          if (!file.type.match('image.*')) {
            continue;
          }

          var reader = new FileReader();
          // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
          reader.onload = function (fileInfo) {
            return function (readerEvent) {
              return _this2.$timeout(function () {
                _this2.ngModel.push({ fileName: fileInfo.name, fileInfo: fileInfo, binary: readerEvent.target.result });
              });
            };
          }(file);
          reader.readAsDataURL(file);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return event;
    }
  }]);

  return InputFileComponent;
}();

_angular2.default.module('angularjs-input-file', []).component('inputFile', {
  template: '<input type="file" />',
  controller: InputFileComponent,
  bindings: {
    fileType: '@',
    ngModel: '=',
    onChange: '&' // TODO Check promise.all with loop file
  }
});

/***/ })
],[1]);
//# sourceMappingURL=angularjs-input-file.map