'use strict';

/**
 * @ngdoc service
 * @name rocolaApp.youtube
 * @description
 * # youtube
 * Service in the rocolaApp.
 */
angular.module('rocolaApp')
  .service('youtubeService', function () {
    var service = this;

    service.search = function (query) {
      var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: query,
        maxResults: 30,
        videoEmbeddable: 'true',
        type: 'video',
        videoCategoryId: '10',
        videoDuration: 'short',
        safeSearch: 'moderate',
        topicId: '10'
      });
    return request;
    };

  });
