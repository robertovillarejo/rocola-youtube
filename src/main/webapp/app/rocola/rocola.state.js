(function() {
    'use strict';

    angular
        .module('rocolayoutubeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('rocola', {
            parent: 'app',
            url: '/rocola',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'rocola.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/rocola/rocola.html',
                    controller: 'RocolaController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rocola');
                    return $translate.refresh();
                }]
            },
            onEnter: ['RocolaService', function(RocolaService) {
                RocolaService.subscribe();
            }],
            onExit: ['RocolaService', function(RocolaService) {
                RocolaService.unsubscribe();
            }]
        });
    }
})();
