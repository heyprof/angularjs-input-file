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
    this.ngModel = [];
    for (const file of files) {
      if (!file.type.match('image.*')) {
        continue;
      }

      const reader = new FileReader();
      // Encapsulatized function for contextualized file + $timeout for proper angularJs refresh
      reader.onload = (fileInfo => readerEvent => this.$timeout(() => {
        this.ngModel.push({fileName: fileInfo.name, fileInfo, binary: readerEvent.target.result});
      }))(file);
      reader.readAsDataURL(file);
    }

    return event;
  }
}

angular.module('angularjs-input-file', []).component('inputFile', {
  template: '<input type="file" />',
  controller: InputFileComponent,
  bindings: {
    fileType: '@',
    ngModel: '=',
    onChange: '&' // TODO Check promise.all with loop file
  }
});
