import angular from 'angular';

import './input-file.component';

class DevServerComponent {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.files = [];

    this.fileChangedBind = result => this.fileChanged(result);
  }

  fileChanged(result) {
    this.$timeout(() => {
      this.files = result;
    });
  }

  openSelectorRegister(handler) {
    this._openSelector = handler;
  }

  openSelector() {
    this._openSelector();
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
  <input-file files-loaded="$ctrl.fileChangedBind"
              multiple="true"></input-file>
</form>
<form>
  <label>ngChange - Base64</label>
  <input-file files-loaded="$ctrl.fileChangedBind"
              file-format="Base64">
  </input-file>
</form>
<form>
  <label>ngChange - Text</label>
  <input-file files-loaded="$ctrl.fileChangedBind"
              file-format="Text">
  </input-file>
</form>

<div>
  <h3>Result: {{ $ctrl.files && $ctrl.files.length }}</h3>
  <ul>
    <li ng-repeat="file in $ctrl.files">
      <pre ng-bind="file.infos && file.infos.name || file.name"></pre>
    </li>
  </ul>
</div>

<button ng-click="$ctrl.openSelector()">Button opening the file selector dialog from the first input-file</button>
`
});
