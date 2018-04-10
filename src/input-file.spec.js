describe('Module: angularjs-input-file -', () => {
  let $componentController;
  let $rootScope;

  beforeEach(angular.mock.module('angularjs-input-file'));
  beforeEach(angular.mock.inject(_$componentController_ => {
    $componentController = _$componentController_;
  }));
  beforeEach(angular.mock.inject(_$rootScope_ => {
    $rootScope = _$rootScope_;
  }));

  describe('Component: inputFile -', () => {
    let ctrl;

    beforeEach(() => {
      ctrl = $componentController('inputFile', {
        $attrs: {},
        $element: angular.element('<div></div>')
      }, {
        filesLoaded: jasmine.createSpy('filesLoaded'),
        openSelectorRegister: jasmine.createSpy('openSelectorRegister')
      });
    });

    describe('Event: filesLoaded', () => {
      it('should be emit', () => {
        ctrl.$onInit();
        ctrl.onInputChange({target: {files: [
          {name: 'heeey', size: 500001}
        ]}});
        $rootScope.$digest();
        expect(ctrl.filesLoaded).toHaveBeenCalled();
      });
    });

    describe('Event: openSelectorRegister', () => {
      it('should be emit', () => {
        ctrl.$onInit();
        expect(ctrl.openSelectorRegister).toHaveBeenCalled();
      });
    });
  });
});
