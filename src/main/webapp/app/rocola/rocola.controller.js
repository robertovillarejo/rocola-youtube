(function () {
    'use strict';

    angular
        .module('rocolayoutubeApp')
        .controller('RocolaController', RocolaController);

    RocolaController.$inject = ['$cookies', '$http', 'RocolaService', 'YouTubeService', '$window'];

    function RocolaController($cookies, $http, RocolaService, YouTubeService, $window) {

        RocolaService.connect();

        var vm = this;

        vm.playlist = [];
        vm.results = [];
        vm.search = searchVideos;
        vm.addVideo = addVideo;

        function searchVideos(query) {
            YouTubeService.search().then(function (response) {
                vm.results = response.data.items;
            });
        }

        function addVideo(video) {
            RocolaService.addVideo({
                title: video.snippet.title,
                description: video.snippet.description,
                url: video.id.videoId
            });
            if (vm.playlist.length === 0 && vm.player.getPlayerState() !== 1) {
                vm.player.cueVideoById(video.id.videoId);
                return;
            }
        }

        RocolaService.receive().then(null, null, function (playlist) {
            vm.playlist = playlist;
        });

        $window.onYouTubeIframeAPIReady = function () {
            vm.player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: '',
                playerVars: {
                    controls: 0,
                    playsinline: 0,
                    disablekb: 1,
                    showinfo: 0,
                    iv_load_policy: 3,
                    rel: 0,
                    fs: 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        function onPlayerReady(event) {
            if (vm.playlist.length > 0) {
                vm.playNextVideo();
            } else {
                // Hacer invisible al reproductor
            }
        }

        vm.playNextVideo = function () {
            var nextVideo = vm.playlist.shift();
            vm.player.cueVideoById(vm.playlist[0].url);
            vm.player.playVideo();
        }

        $window.onStateChange = function () {
            console.log('On state change');
        }

        function onPlayerStateChange (event) {
            vm.PlayerState = event.data;
            if (event.data === YT.PlayerState.ENDED) {
                if (vm.playlist.length > 0) {
                    vm.playNextVideo();
                } else {
                    // Hacer invisible al reproductor
                }
            }
            if (vm.player.getPlayerState() === 5 && vm.playlist.length === 0) {
                vm.player.playVideo();
            }
        }

    }
})();
