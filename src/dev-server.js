import angular from 'angular';

import './input-file.component';

class DevServerComponent {
  constructor($timeout) {
    this.$timeout = $timeout;
  }

  $onInit() {
    this.files = [];
  }

  fileChanged(result) {
    console.log('Hey !', result);
    this.files.length = 0;
    this.$timeout(() => {
      [].push.apply(this.files, result);
    });
  }

  openSelectorRegister(handler) {
    this._openSelector = handler;
  }

  openSelector() {
    this._openSelector();
    console.log(this.aFunction);
  }
}

angular.module('dev-server', [
  'angularjs-input-file'
]).component('devServer', {
  controller: DevServerComponent,
  template: `
<form>
  <label>no params</label>
  <input-file data-ng-model="$ctrl.files"
              id="heyId"
              open-selector-register="$ctrl.openSelectorRegister(handler)"></input-file>
</form>
<form>
  <label>multiple</label>
  <input-file multiple></input-file>
  <!-- Also accept multiple="true" -->
</form>
<form>
  <label>accept jpg</label>
  <input-file accept="image/*"></input-file>
  <!-- Also accept multiple="true" -->
</form>
<form>
  <label>ngChange - Default</label>
  <input-file files-loaded="$ctrl.fileChanged"></input-file>
</form>
<form>
  <label>ngChange - Base64</label>
  <input-file files-loaded="$ctrl.fileChanged"
              file-format="Base64">
  </input-file>
</form>
<form>
  <label>ngChange - Text</label>
  <input-file files-loaded="$ctrl.fileChanged"
              file-format="Text">
  </input-file>
</form>

<div>
  <h3>Result:</h3>
  <pre>{{ $ctrl.files | json }}</pre>
</div>

<button ng-click="$ctrl.openSelector()">Button opening the file selector dialog from the first input-file</button>
`
});
