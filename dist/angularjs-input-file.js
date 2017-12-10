/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      var inputElement = this.$element[0].getElementsByTagName('input')[0];

      // If there is a multiple attribute different than "false"
      if (this.$attrs.multiple !== 'false' && (this.$attrs.multiple === '' || this.$attrs.multiple)) {
        inputElement.setAttribute('multiple', '');
      }
      inputElement.addEventListener('change', this.onInputChange, false);
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(event) {
      var _this = this;

      var files = event.target.files;
      if (this.ngModel) {
        this.ngModel.length = 0;
      } else {
        this.ngModel = [];
      }
      var fileLoaded = files.map(function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          // See event handlers of `FileReader` here:
          // https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Properties

          // Catch errors to reject
          reader.onabort = reject;
          reader.onerror = reject;

          // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
          reader.onload = function (infos) {
            return function (readerEvent) {
              return _this.$timeout(function () {
                var fileLoaded = { infos: infos, file: readerEvent.target.result };
                _this.ngModel.push(fileLoaded);
                resolve(fileLoaded);
              });
            };
          }(file);

          switch (_this.fileFormat) {
            case 'Text':
              reader.readAsText(file);
              break;
            case 'Base64':
              reader.readAsDataURL(file);
              break;
            case 'ArrayBuffer':
            default:
              reader.readAsArrayBuffer(file);
          }
        });
      });

      return Promise.all(fileLoaded).then(function (response) {
        _this.ngChange(response);
      });
    }
  }]);

  return InputFileComponent;
}();

angular.module('angularjs-input-file', []).component('inputFile', {
  template: '<input type="file" accept="{{ $ctrl.accept }}" />',
  controller: InputFileComponent,
  bindings: {
    accept: '@',
    fileFormat: '@',
    fileType: '@',
    ngModel: '=',
    ngChange: '&'
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=angularjs-input-file.map