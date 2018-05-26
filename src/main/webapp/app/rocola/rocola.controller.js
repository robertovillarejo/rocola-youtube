(function () {
    'use strict';

    angular
        .module('rocolayoutubeApp')
        .controller('RocolaController', RocolaController);

    RocolaController.$inject = ['$cookies', '$http', 'RocolaService', 'YouTubeService'];

    function RocolaController($cookies, $http, RocolaService, YouTubeService) {

        var vm = this;

        vm.playlist = [];
        vm.results = [];
        vm.search = searchVideos;
        vm.addVideo = addVideo;

        function searchVideos(query) {
            YouTubeService.search().then(response => {
                vm.results = response.data.items;
            });
        }

        function addVideo(video) {
            RocolaService.addVideo({
                title: video.snippet.title,
                description: video.snippet.description,
                url: video.id.videoId
            });
        }

        RocolaService.receive().then(null, null, function (playlist) {
            showPlaylist(playlist);
            console.log(playlist);
            console.log('Servicio listo');
        });

        function showPlaylist(playlist) {
        }

    }
})();
