import angular from 'angular';

import './input-file.component';

function DevServerComponent($timeout) {
  const vm = this;
  vm.$onInit = () => {
    vm.files = [];
  };

  vm.fileChanged = result => {
    console.log('Hey !', result);
    vm.files.length = 0;
    $timeout(() => {
      [].push.apply(vm.files, result);
    });
  };
}

angular.module('dev-server', [
  'angularjs-input-file'
]).component('devServer', {
  controller: ['$timeout', DevServerComponent],
  template: `
<form>
  <label>no params</label>
  <input-file data-ng-model="$ctrl.files"></input-file>
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
`
});
