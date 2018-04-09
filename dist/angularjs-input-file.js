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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/input-file.component.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/input-file.component.js":
/*!*************************************!*\
  !*** ./src/input-file.component.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar InputFileComponent =\n/*#__PURE__*/\nfunction () {\n  InputFileComponent.$inject = [\"$timeout\", \"$element\", \"$attrs\"];\n\n  /** @ngInject */\n  function InputFileComponent($timeout, $element, $attrs) {\n    _classCallCheck(this, InputFileComponent);\n\n    this.$timeout = $timeout;\n    this.$element = $element;\n    this.$attrs = $attrs;\n  }\n\n  _createClass(InputFileComponent, [{\n    key: \"$onInit\",\n    value: function $onInit() {\n      var _this = this;\n\n      this.openSelectorRegister({\n        handler: function handler() {\n          return _this.openSelector();\n        }\n      });\n    }\n  }, {\n    key: \"$postLink\",\n    value: function $postLink() {\n      var _this2 = this;\n\n      var inputElement = this.$element[0].getElementsByTagName('input')[0]; // If there is a multiple attribute different than \"false\"\n\n      if (this.$attrs.multiple !== 'false' && (this.$attrs.multiple === '' || this.$attrs.multiple)) {\n        inputElement.setAttribute('multiple', '');\n      }\n\n      inputElement.addEventListener('change', function (event) {\n        return _this2.onInputChange(event);\n      }, false);\n    }\n  }, {\n    key: \"openSelector\",\n    value: function openSelector() {\n      this.$element.find('input')[0].click();\n    }\n  }, {\n    key: \"onInputChange\",\n    value: function onInputChange(event) {\n      var _this3 = this;\n\n      var inputFiles = event.target.files;\n      var files = [];\n\n      var fileLoaded = _toConsumableArray(inputFiles).map(function (inputFile) {\n        return new Promise(function (resolve, reject) {\n          if (!_this3.fileFormat) {\n            resolve(inputFile);\n            return;\n          }\n\n          var reader = new FileReader(); // See event handlers of `FileReader` here:\n          // https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Properties\n          // Catch errors to reject\n\n          reader.onabort = reject;\n          reader.onerror = reject; // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh\n\n          reader.onload = function (infos) {\n            return function (readerEvent) {\n              return _this3.$timeout(function () {\n                var fileLoaded = {\n                  infos: infos,\n                  file: readerEvent.target.result\n                };\n                files.push(fileLoaded);\n                resolve(fileLoaded);\n              });\n            };\n          }({\n            name: inputFile.name,\n            size: inputFile.size,\n            type: inputFile.type,\n            lastModified: inputFile.lastModified\n          });\n\n          switch (_this3.fileFormat) {\n            case 'Text':\n              reader.readAsText(inputFile);\n              break;\n\n            case 'Base64':\n              reader.readAsDataURL(inputFile);\n              break;\n\n            case 'ArrayBuffer':\n            default:\n              reader.readAsArrayBuffer(inputFile);\n          }\n        });\n      });\n\n      return Promise.all(fileLoaded).then(function (response) {\n        if (_this3.filesLoaded) {\n          _this3.filesLoaded({\n            files: response\n          });\n        }\n      });\n    }\n  }]);\n\n  return InputFileComponent;\n}();\n\nangular.module('angularjs-input-file', []).component('inputFile', {\n  template: \"\\n  <input type=\\\"file\\\" \\n         id=\\\"{{ $ctrl.id }}\\\"\\n         accept=\\\"{{ $ctrl.accept }}\\\" />\",\n  controller: InputFileComponent,\n  bindings: {\n    inputId: '@',\n    accept: '@',\n    fileFormat: '@',\n    fileType: '@',\n    filesLoaded: '&',\n    openSelectorRegister: '&'\n  }\n});\n\n//# sourceURL=webpack:///./src/input-file.component.js?");

/***/ })

/******/ });