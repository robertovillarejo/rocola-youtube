'use strict';

/**
 * @ngdoc service
 * @name rocolaApp.youtube
 * @description
 * # youtube
 * Service in the rocolaApp.
 */
angular.module('rocolaApp')
  .service('youtubeService', ['$http', function ($http) {
    var service = this;
    service.results = {};

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
      }, function () {
        service.results = {};
      });
    };

  }]);
