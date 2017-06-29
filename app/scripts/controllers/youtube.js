'use strict';

/**
 * @ngdoc function
 * @name rocolaApp.controller:YoutubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the rocolaApp
 */
angular.module('rocolaApp')
  .controller('YoutubeCtrl', ['youtubeService', function (youtubeService) {
    var vm = this;

    vm.search = function (query) {
      var request = youtubeService.search(query);
      request.execute(vm.onSearchResponse);
    };

    vm.onSearchResponse = function (response) {
        vm.videos = response.items;
    };

  }]);
