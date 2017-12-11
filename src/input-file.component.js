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
    inputElement.addEventListener('change', event => this.onInputChange(event), false);
  }

  onInputChange(event) {
    const inputFiles = event.target.files;
    const files = [];
    const fileLoaded = [...inputFiles].map(inputFile => new Promise((resolve, reject) => {
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

      console.log(inputFile);

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

    return Promise.all(fileLoaded).then(response => {
      if (this.filesLoaded) {
        this.filesLoaded(response);
      }
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
    filesLoaded: '<'
  }
});
