'use strict';

/**
 * @ngdoc overview
 * @name rocolaApp
 * @description
 * # rocolaApp
 *
 * Main module of the application.
 */
angular
  .module('rocolaApp', ['LocalStorageModule'])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('rocola');
  }])
  .run(function () {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
