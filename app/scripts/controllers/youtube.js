'use strict';

/**
 * @ngdoc function
 * @name rocolaApp.controller:YoutubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the rocolaApp
 */
angular.module('rocolaApp')
  .controller('YoutubeCtrl', ['youtubeService', 'localStorageService', function (youtubeService, localStorageService) {
    var vm = this;

    vm.playlist = localStorageService.get('playlist');

    vm.search = function (query) {
      var request = youtubeService.search(query);
      request.execute(vm.onSearchResponse);
    };

    vm.onSearchResponse = function (response) {
        vm.videos = response.items;
    };

    vm.queueVideo =  function (video) {
      vm.playlist.push(video);
      localStorageService.set('playlist', vm.playlist);
    };

  }]);
