(function () {
    'use strict';

    angular
        .module('rocolayoutubeApp')
        .factory('YouTubeService', YouTubeService);

    YouTubeService.$inject = ['$http'];

    function YouTubeService($http) {
        var service = {
            search: search
        };

        return service;

        function search(query) {
            return $http.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: 'AIzaSyB-kfUTllY47Aq2amoLel2E-ul7udCB69E',
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
    }

})();
