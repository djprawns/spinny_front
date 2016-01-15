MyApp.config(function($routeProvider, $mdIconProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './app/components/login/login.html',
            controller: 'LoginController'
        })
        .when('/agent', {
            templateUrl: './app/components/home/home.html',
            controller: 'DataController'
        })
        .when('/agent/:agentId', {
            templateUrl: './app/components/agent/agent_details.html',
            controller: 'InfoController'
        })
        .otherwise({
        	redirectTo : '/home'
        });
});