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

    service.playlist = [];

    function init() {
      var data = localStorageService.get('playlist');
      if (!data) {
        service.playlist = data;
      }
    }

    init();

    service.search = function (query) {
      return $http.get('https://www.googleapis.com/youtube/v3/search', {
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
      });
    };

    service.savePlaylist = function (playlist) {
      localStorageService.set('playlist', playlist);
    };

  }]);
