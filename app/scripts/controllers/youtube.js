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

    class CreditState {

      constructor(controller) {
        this.vm = controller;
      }

      queueVideo(video) {
        console.log('CreditState');
        video.rocolaId = new Date().getTime();
        if (vm.playlist.length === 0 && vm.player.getPlayerState() !== 1) {
          vm.player.cueVideoById(video.id.videoId);
          return;
        }
        vm.playlist.push(video);
        vm.savePlaylist(vm.playlist);
      }

    }

    class NoCreditState {

      constructor(controller) {
        this.vm = controller;
      }

      queueVideo(video) {
        console.log('NoCredit');
        video.rocolaId = new Date().getTime();
        if (vm.playlist.length === 0 && vm.player.getPlayerState() !== 1) {
          vm.player.cueVideoById(video.id.videoId);
          return;
        }
        vm.playlist.push(video);
        vm.savePlaylist(vm.playlist);
      }

    }

    var vm = this;

    // Inicializa playlist con los datos guardados en disco
    vm.playlist = youtubeService.playlist;
    vm.state = new CreditState(vm);

    vm.savePlaylist = function (playList) {
      youtubeService.savePlaylist(playList);
    }

    vm.search = function (query) {
      youtubeService.search(query).then(function (response) {
        vm.videos = response.data.items;
      }, function () {
        vm.videos = {};
      });
    };

    vm.queueVideo = function (video) {
      vm.state.queueVideo(video);
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
    };

    function onPlayerReady(event) {
      if (vm.playlist.length > 0) {
        vm.playNextVideo();
      } else {
        // Hacer invisible al reproductor
      }
    }

    function onPlayerStateChange(event) {
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

    vm.playNextVideo = function () {
      var nextVideo = vm.playlist.shift();
      vm.player.cueVideoById(nextVideo.id.videoId);
      vm.player.playVideo();
      youtubeService.savePlaylist(vm.playlist);
    };

  }]);
