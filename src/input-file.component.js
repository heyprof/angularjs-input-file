class InputFileComponent {
  /** @ngInject */
  constructor($timeout, $element, $attrs) {
    this.$timeout = $timeout;
    this.$element = $element;
    this.$attrs = $attrs;
  }

  $onInit() {
    const inputElement = this.$element[0].getElementsByTagName('input')[0];

    // If there is a multiple attribute different than "false"
    if (this.$attrs.multiple !== 'false' && (this.$attrs.multiple === '' || this.$attrs.multiple)) {
      inputElement.setAttribute('multiple', '');
    }
    inputElement.addEventListener('change', this.onInputChange, false);
  }

  onInputChange(event) {
    const files = event.target.files;
    if (this.ngModel) {
      this.ngModel.length = 0;
    } else {
      this.ngModel = [];
    }
    const fileLoaded = files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();

      // See event handlers of `FileReader` here:
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Properties

      // Catch errors to reject
      reader.onabort = reject;
      reader.onerror = reject;

      // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
      reader.onload = (infos => readerEvent => this.$timeout(() => {
        const fileLoaded = {infos, file: readerEvent.target.result};
        this.ngModel.push(fileLoaded);
        resolve(fileLoaded);
      }))(file);

      switch (this.fileFormat) {
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
    }));

    return Promise.all(fileLoaded).then(response => {
      this.ngChange(response);
    });
  }
}

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
