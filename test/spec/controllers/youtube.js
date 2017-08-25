'use strict';

describe('Controller: YoutubeCtrl', function () {

  // load the controller's module
  beforeEach(module('rocolaApp'));

  var YoutubeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YoutubeCtrl = $controller('YoutubeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(YoutubeCtrl.awesomeThings.length).toBe(3);
  });
});
