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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

      var inputFiles = event.target.files;
      var files = [];
      var fileLoaded = [].concat(_toConsumableArray(inputFiles)).map(function (inputFile) {
        return new Promise(function (resolve, reject) {
          if (!_this2.fileFormat) {
            resolve(inputFile);
            return;
          }
          var reader = new FileReader();

          // See event handlers of `FileReader` here:
          // https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Properties

          // Catch errors to reject
          reader.onabort = reject;
          reader.onerror = reject;

          console.log(inputFile);

          // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
          reader.onload = function (infos) {
            return function (readerEvent) {
              return _this2.$timeout(function () {
                var fileLoaded = {
                  infos: infos,
                  file: readerEvent.target.result
                };
                files.push(fileLoaded);
                resolve(fileLoaded);
              });
            };
          }({
            name: inputFile.name,
            size: inputFile.size,
            type: inputFile.type,
            lastModified: inputFile.lastModified
          });

          switch (_this2.fileFormat) {
            case 'Text':
              reader.readAsText(inputFile);
              break;
            case 'Base64':
              reader.readAsDataURL(inputFile);
              break;
            case 'ArrayBuffer':
            default:
              reader.readAsArrayBuffer(inputFile);
          }
        });
      });

      return Promise.all(fileLoaded).then(function (response) {
        if (_this2.filesLoaded) {
          _this2.filesLoaded(response);
        }
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
    filesLoaded: '<'
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=angularjs-input-file.map