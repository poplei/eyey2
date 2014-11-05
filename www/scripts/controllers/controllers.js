angular.module('eApp.controllers')

    .controller('AppController', function($scope, $rootScope, $window, $location, AppService, $ionicSideMenuDelegate) {
        $scope.appversion = AppService.appversion();

        $scope.goToPage = function(page) {
            // console.log($rootScope.isTablet);
            if (!$rootScope.isTablet) {
                $ionicSideMenuDelegate.toggleLeft(false);
            }
            $location.url('/' + page);
        };

        $scope.closeSideMenu = function() {
            $ionicSideMenuDelegate.close();
        };

        $scope.goBack = function() {
            $window.history.back();
        };

        $scope.openLeftPanel = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.openRightPanel = function() {
            $ionicSideMenuDelegate.toggleRight();
        };

    })

    .controller('HomeController', function($scope, AppService, $translate  ) {
        $scope.randomQuote = AppService.randomQuote();
        $scope.newQuote = function() {
            $scope.randomQuote = AppService.randomQuote();
        };
        $scope.curlang = $translate.use();
    })

    .controller('OptionsController', function($scope, BookService, $translate) {
        $scope.titolo = $translate.instant('BOOKS');
        $scope.curlang = $translate.use();
        $scope.changeLanguage = function(key) {
            $translate.use(key);
            $scope.curlang = key;
        };
    })


    .controller('BooksController', function($scope, BookService) {
        BookService.all(function(books) {
            $scope.books = books;
            $scope.$apply();
        });

        $scope.clearFilter = function() {
            $scope.searchString = '';
            $scope.searchString = '';
            $scope.searchString = '';
            $scope.searchString = '';
        };
    })

    .controller('BookDetailController', function($scope,$rootScope, $stateParams, BookService) {
        $rootScope.allowRightMenu = true;

        $scope.book = BookService.get($stateParams.bookId);

//        BookService.get($stateParams.bookId, function(book) {
//            $scope.book = book;
//            $scope.$apply();
//        });

        var fontClasses = {1: 'xsmall', 2: 'small', 3: 'normal', 4: 'large', 5: 'xlarge'};

        $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
        if ($rootScope.bookDarkMode) {
            $scope.stylemodeClass = 'dark-content';
        }

        $scope.changeStyle = function() {
            $rootScope.bookDarkMode = !$rootScope.bookDarkMode;
            // console.log('change style' + $rootScope.bookDarkMode);
            if ($rootScope.bookDarkMode) {
                $scope.stylemodeClass = 'dark-content';
            } else {
                $scope.stylemodeClass = '';
            }

        };

        $scope.zoomInText = function() {
            if ($rootScope.bookZoom > 1) {
                $rootScope.bookZoom -= 1;
                $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };

        $scope.zoomOutText = function() {
            if ($rootScope.bookZoom < 5) {
                $rootScope.bookZoom += 1;
                $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };

        $scope.fullscreen = function() {
            alert('not yet ;)');
        };

        $scope.chapters = function() {
            $scope.sideMenuController.toggleRight();
        };
    })

    .controller('BookReadController', function($scope, $stateParams, BookService) {
        BookService.get($stateParams.bookId, function(book) {
            $scope.book = book;
            $scope.$apply();
        });

    })

    .controller('ArticlesController', function($scope, ArticleService) {
        $scope.articles = ArticleService.all();
        //console.log(21321321321);
        //console.log( $scope.articles);
        $scope.clearFilter = function() {
            $scope.searchString = '';
        };
    })

    .controller('ArticleDetailController', function($scope, $stateParams, ArticleService) {
        $scope.article = ArticleService.get($stateParams.articleId);
    })

;
