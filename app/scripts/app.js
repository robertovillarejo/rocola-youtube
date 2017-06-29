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
  .module('rocolaApp', []);

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyD8839x5fpTHddEocyJZKsbUihKT_S5QeA');
}
