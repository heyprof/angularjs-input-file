## Install

- npm: `npm install --save angularjs-input-file`
- bower: `bower install --save angularjs-input-file`

## Demo

<input-file data-ng-model="files"></input-file>
<img ng-repeat="file in files" ng-src="{{file.binary}}" height="170" />

## Usage

Add module to your app:

```javascript
angular.module('app', ['angularjs-input-file']);
```

And the component where you want in this app:

```html
<input-file data-ng-model="files"></input-file>
```

`files` data format look like:
See data in your view:

```json
[
  {
    "fileName": "Name of the file",
    "fileInfo": {}, // File MetaDatas
    "binary": "base64 formatted binary"
  },
  [... if `multiple` is defined]
]
```

## LICENCE MIT

The MIT License (MIT)

Copyright (c) 2017 HeyProf!

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
