"use strict";
ionic.Platform.ready(function(){
    console.log("Platform is ready!");
});

angular.module('eApp.controllers', []);
angular.module('eApp.services', []);
angular.module('eApp.directives', []);
angular.module('eApp', ['ionic', 'ngTouch', 'pascalprecht.translate',/* 'fsCordova',*/ 'eApp.services', 'eApp.controllers', 'eApp.directives'])

    .run(function($rootScope, $window) {
        console.log("**** app.run");
        $rootScope.windowWidth = $window.outerWidth;
        $rootScope.appVersion = appConfig.version;
        $rootScope.bookZoom = 3; // 3 is normal, 0 is smallest, 5 is biggest
        $rootScope.bookDarkMode = false;

        $rootScope.allowRightMenu = true;

        if ($rootScope.windowWidth < 768) {
            $rootScope.isTablet = false;
        } else {
            //$rootScope.isTablet = true;
            // TODO - now disabled because it doesn't work in big browsers window (doesn't get the iframe width)
            $rootScope.isTablet = false;
        }
        angular.element($window).bind('resize', function() {
            $rootScope.windowWidth = $window.outerWidth;
            $rootScope.$apply('windowWidth');
        });
    })

    .config(function($translateProvider) {
        $translateProvider.translations('cn', translations_cn);
        $translateProvider.translations('en', translations_en);
        $translateProvider.preferredLanguage('cn');
        // console.log("$translateProvider initialized");
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('books', {
                url: '/books',
                templateUrl: 'views/books.html',
                controller: 'BooksController'
            })
            .state('book-detail', {
                url: '/book/:bookId',
                templateUrl: 'views/book-detail.html',
                controller: 'BookDetailController'

            })
            .state('article-index', {
                url: '/article',
                templateUrl: 'views/articles.html',
                controller: 'ArticlesController'
            })
            .state('article-detail', {
                url: '/article/:articleId',
                templateUrl: 'views/article-detail.html',
                controller: 'ArticleDetailController'

            })
            .state('options', {
                url: '/options',
                templateUrl: 'views/options.html',
                controller: 'OptionsController'
            })
            .state('credits', {
                url: '/credits',
                templateUrl: 'views/credits.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });
