MyApp.controller('LoginController', function($scope, $mdDialog, $mdToast, $animate, SharedDataService, $location, SharedComponents, $cookies) {
    $scope.submit = function() {
        SharedDataService.repLogin($scope.login.username, $scope.login.password).
        then(function(data) {
            if (data.data.success) {
                $location.path('/agent');
                $cookies.put('token', data.data.sessionToken);
                // console.log(session);
            } else {
                SharedComponents.showSimpleToast(data.data.message);
            }
        });
    }
});