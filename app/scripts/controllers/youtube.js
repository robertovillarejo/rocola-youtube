'use strict';

/**
 * @ngdoc function
 * @name rocolaApp.controller:YoutubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the rocolaApp
 */
angular.module('rocolaApp')
  .controller('YoutubeCtrl', ['youtubeService', '$window', function (youtubeService, $window) {
    var vm = this;

    // Inicializa playlist con los datos guardados en disco
    vm.playlist = youtubeService.getPlaylist();

    vm.search = function (query) {
      youtubeService.search(query);
      vm.videos = youtubeService.results;
    };

    vm.queueVideo =  function (video) {
      if (vm.playlist.length == 0 && vm.player.getPlayerState() != 1) {
        vm.player.cueVideoById(video.id.videoId);
        return;
      }
      vm.playlist.push(video);
      youtubeService.savePlaylist(vm.playlist);
    };

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
    }

    function onPlayerReady(event) {
      if (vm.playlist.length > 0) {
        vm.playNextVideo();
      } else {
        // Hacer invisible al reproductor
      }
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        if (vm.playlist.length > 0) {
          vm.playNextVideo();
        } else {
          // Hacer invisible al reproductor
        }
      }
      if (vm.player.getPlayerState() == 5 && vm.playlist.length == 0) {
        vm.player.playVideo();
      }
    }

    vm.playNextVideo = function () {
      var nextVideo = vm.playlist.shift();
      vm.player.cueVideoById(nextVideo.id.videoId);
      vm.player.playVideo();
      youtubeService.savePlaylist(vm.playlist);
    };

  }]);
