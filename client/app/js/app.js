angular.module('menumanager', ['ui.router', 'lbServices'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/menu");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: 'LoginCtrl'
  }).state('today', {
      url: "/today",
      templateUrl: "views/today.html",
      controller: 'TodayCtrl'
    })
    .state('menu', {
      url: "/menu",
      templateUrl: "views/menu.html",
      controller: 'MenuCtrl'
    });

    // $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
        return {
            responseError: function(rejection) {
              if (rejection.status == 401) {
                //Now clearing the loopback values from client browser for safe logout...
                LoopBackAuth.clearUser();
                LoopBackAuth.clearStorage();
                $location.nextAfterLogin = $location.path();
                $location.path('/login');
              }
              return $q.reject(rejection);
            }
          };
    });

});
