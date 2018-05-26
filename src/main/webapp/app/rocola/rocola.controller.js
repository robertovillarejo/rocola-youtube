(function () {
    'use strict';

    angular
        .module('rocolayoutubeApp')
        .controller('RocolaController', RocolaController);

    RocolaController.$inject = ['$cookies', '$http', 'RocolaService', 'YouTubeService', '$window', '$scope'];

    function RocolaController($cookies, $http, RocolaService, YouTubeService, $window, $scope) {

        RocolaService.connect();

        var vm = this;
        vm.state;
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
            vm.state.addVideo(video);
        }

        RocolaService.receive().then(null, null, function (playlist) {
            vm.playlist = playlist;
            if (vm.playlist.length > 0) {
                vm.state = notEmptyPlaylist;
                console.log('state not empty');
            } else {
                vm.state = emptyPlaylist;
                console.log('state empty');
            }
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
            vm.state.playNextVideo();
        }

        function onPlayerStateChange(event) {
            vm.PlayerState = event.data;
            switch (event.data) {
                case YT.PlayerState.ENDED:
                    vm.state.playNextVideo();
                    break;

                case 5:
                    console.log('Play VIDEO');
                    vm.player.playVideo();
                    break;
            }
        }

        function saveVideo(video) {
            RocolaService.addVideo({
                title: video.snippet.title,
                description: video.snippet.description,
                url: video.id.videoId
            });
        }

        var emptyPlaylist = {
            addVideo: function (video) {
                saveVideo(video);
                vm.playlist.push(video);
                if (vm.player.getPlayerState() !== YT.PlayerState.ENDED) {
                    vm.player.cueVideoById(video.id.videoId);
                }
                vm.state = notEmptyPlaylist;
                console.log('state not emtpy');
            },
            playNextVideo: function () {
                return;
            }
        }

        var notEmptyPlaylist = {
            addVideo: function (video) {
                saveVideo(video);
                vm.playlist.push(video);
            },
            playNextVideo: function () {
                $scope.$apply(function () {
                    vm.player.cueVideoById(vm.playlist.shift().url);
                });
                if (vm.playlist.length === 0) {
                    vm.state = emptyPlaylist;
                }
            }
        }
    }
})();
