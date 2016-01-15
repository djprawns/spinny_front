spinnyApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'DataController'
        });
});