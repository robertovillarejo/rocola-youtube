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

    vm.playlist = [];

    init();

    function init() {
      var data = localStorageService.get('playlist');
      if (data != undefined || data != null) {
        vm.playlist = data;
      }
    }

    vm.search = function (query) {
      youtubeService.search(query);
      vm.videos = youtubeService.results;
    };

    vm.queueVideo =  function (video) {
      vm.playlist.push(video);
      localStorageService.set('playlist', vm.playlist);
    };

  }]);
