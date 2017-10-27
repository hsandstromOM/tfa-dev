const ee = require('./services');
const moment = window.moment;
const underscore = window.underscore;
angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ui.router',
        'angular-storage',
        'angular-jwt',
        'angucomplete-alt',
        'contentful',
        'ui.bootstrap',
        'angularUtils.directives.dirPagination',
        'hc.marked',
        'slugifier',
        '720kb.socialshare'
    ])
    .constant('ee', ee)
    .constant('moment', moment)
    .constant('underscore', underscore)
    .config(['$urlRouterProvider', '$stateProvider', 'contentfulProvider', '$locationProvider', '$compileProvider',
        function($urlRouterProvider, $stateProvider, contentfulProvider, $locationProvider, $compileProvider) {
            // Performance improvement/cleaner markup
            // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476
            $compileProvider.debugInfoEnabled(false);
            // Contentful configs
            contentfulProvider.setOptions({
                space: 'xxxxxxx',
                accessToken: 'xxxxxxxxxxx',
            });
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('site', require('./components/layout'))
                .state('site.home', require('./components/templates/home/home-controller'))

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
            });
        },
    ])
    .directive('navFooter', require('./components/directives/footer.js'))
    .directive('navHeader', require('./components/directives/header.js'))
