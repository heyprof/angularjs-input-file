class InputFileComponent {
  /** @ngInject */
  constructor($q, $timeout, $element, $attrs) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$element = $element;
    this.$attrs = $attrs;
  }

  $onInit() {
    this.openSelectorRegister({
      handler: () => this.openSelector()
    });
  }

  $postLink() {
    const inputElement = this.$element[0].getElementsByTagName('input')[0];

    // If there is a multiple attribute different than "false"
    if (this.$attrs.multiple !== 'false' && (this.$attrs.multiple === '' || this.$attrs.multiple)) {
      inputElement.setAttribute('multiple', '');
    }
    inputElement.addEventListener('change', event => this.onInputChange(event), false);
  }

  openSelector() {
    this.$element.find('input')[0].click();
  }

  onInputChange(event) {
    const inputFiles = event.target.files;
    const files = [];
    const fileLoaded = [...inputFiles].map(inputFile => this.$q((resolve, reject) => {
      if (!this.fileFormat) {
        resolve(inputFile);
        return;
      }
      const reader = new FileReader();

      // See event handlers of `FileReader` here:
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Properties

      // Catch errors to reject
      reader.onabort = reject;
      reader.onerror = reject;

      // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
      reader.onload = (infos => readerEvent => this.$timeout(() => {
        const fileLoaded = {
          infos,
          file: readerEvent.target.result
        };
        files.push(fileLoaded);
        resolve(fileLoaded);
      }))({
        name: inputFile.name,
        size: inputFile.size,
        type: inputFile.type,
        lastModified: inputFile.lastModified
      });

      switch (this.fileFormat) {
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
    }));

    return this.$q.all(fileLoaded).then(response => {
      this.filesLoaded({
        files: response
      });
    });
  }
}

angular.module('angularjs-input-file', []).component('inputFile', {
  template: `
  <input type="file" 
         ng-attr-accept="{{ $ctrl.accept }}"
         ng-attr-id="{{ $ctrl.inputId }}"
         ng-disabled="$ctrl.disabled" />`,
  controller: InputFileComponent,
  bindings: {
    inputId: '@',
    accept: '@',
    fileFormat: '@',
    fileType: '@',
    disabled: '<isDisabled',
    filesLoaded: '&',
    openSelectorRegister: '&'
  }
});
