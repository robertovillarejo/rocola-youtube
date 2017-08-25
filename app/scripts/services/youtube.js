'use strict';

/**
 * @ngdoc service
 * @name rocolaApp.youtube
 * @description
 * # youtube
 * Service in the rocolaApp.
 */
angular.module('rocolaApp')
  .service('youtubeService', ['$http', 'localStorageService', function ($http, localStorageService) {
    var service = this;
    service.results = {};

    service.playlist = [];

    function init() {
      var data = localStorageService.get('playlist');
      if (data !== undefined || data !== null) {
        service.playlist = data;
      }
    }

    init();

    service.search = function (query) {
      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyD8839x5fpTHddEocyJZKsbUihKT_S5QeA',
          part: 'snippet',
          q: query,
          maxResults: 30,
          videoEmbeddable: 'true',
          type: 'video',
          videoCategoryId: '10',
          videoDuration: 'short',
          safeSearch: 'moderate',
          topicId: '10'
        }
      })
      .then(function (response) {
        service.results = response.data.items;
        console.log(response);
      }, function () {
        service.results = {};
      });
    };

    service.savePlaylist = function (playlist) {
      localStorageService.set('playlist', playlist);
    };

    service.getPlaylist = function () {
      return service.playlist;
    };

  }]);
