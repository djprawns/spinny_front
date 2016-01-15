MyApp.controller('InfoController', function($scope, $mdDialog, $mdToast, $animate, $routeParams, SharedDataService, $location, $cookies, SharedComponents, $route) {
    $scope.$parent.hideSpan = false;
    $scope.agentId = $routeParams.agentId;
    $scope.logout = function() {
        $cookies.remove('token');
        $location.path('/', false);
        SharedComponents.showSimpleToast('Successfully Logged Out');
    };

    // $scope.$on('$locationChangeSuccess', function(event) {
        // console.log('asd');
        // location.skipReload().path("/agent").replace();
            // Want to prevent re-loading when going from /dataEntry/1 to some other dataEntry path
            // if ($route && $route.current && $route.current.$route.templateUrl.indexOf('dataEntry') > 0) {
            //     $route.current = lastRoute; //Does the actual prevention of routing
            // }
            // console.log(lastRoute);
    // });
    // location.skipReload().path("/newpath").replace();
    // var b = SharedDataService.getAgents();
    SharedDataService.getAgent($scope.agentId).
        then(function(response) {
            console.log(response.data.agent[0]);
            $scope.agentId = response.data.agent[0].name;
            $scope.mobile = response.data.agent[0].agent;
            $scope.email = response.data.agent[0].email;
            $scope.card_id = response.data.agent[0].card_id;
            $scope.temp = response.data.agent[0];
        });
    // b[0].forEach(function(entry){
    //     // console.log(entry);
    //     if(entry.agent_id == $routeParams.agentId) {
    //         console.log(entry);
    //         $scope.agentId = entry.name;
    //         $scope.mobile = entry.agent;
    //         $scope.email = entry.email;
    //         $scope.card_id = entry.card_id;
    //     }
    // });
    
    SharedDataService.getAgentBookingApi($routeParams.agentId).then(function(data){
        $scope.bookings = data[0].bookings_list;
        $scope.bookings.count = data[0].count;
        console.log(data[0].count);
        $scope.$parent.hideSpan = true;
    });
    SharedDataService.getPaymentDetails($scope.card_id).then(function(data){
        console.log(data.data.message);
        $scope.payment_details = data.data.message;
        $scope.payment_details.count = data.data.count;
        $scope.$parent.hideSpan = true;
    });
    // // console.log(b);
    // // $scope.bookings = b.data.bookings_list;
    // // console.log($scope.bookings);
    // $scope.toastPosition = {
    //     bottom: true,
    //     top: false,
    //     left: true,
    //     right: false
    // };
    // $scope.getToastPosition = function() {
    //     return Object.keys($scope.toastPosition)
    //         .filter(function(pos) {
    //             return $scope.toastPosition[pos];
    //         })
    //         .join(' ');
    // };
    // $scope.showSimpleToast = function() {
    //     $mdToast.show(
    //         $mdToast.simple()
    //         .content('Agent Deleted')
    //         .position($scope.getToastPosition())
    //         .hideDelay(3000)
    //     );
    // };
    // $scope.showConfirm = function(ev, agent) {
    //     // Appending dialog to document.body to cover sidenav in docs app
    //     var confirm = $mdDialog.confirm()
    //         .parent(angular.element(document.body))
    //         .title('Would you really like to delete this agent?')
    //         .content('All of the banks have agreed to forgive you your debts.')
    //         .ariaLabel('Lucky day')
    //         .ok('Yes')
    //         .cancel('No')
    //         .targetEvent(ev);
    //     $mdDialog.show(confirm).then(function() {
    //         // $scope.alert = 'You decided to get rid of your debt.';
    //         // console.log(agent);
    //         var index = $scope.agents.indexOf(agent);
    //         $scope.agents.splice(index, 1);
    //         $scope.showSimpleToast();
    //     }, function() {
    //         $scope.alert = 'You decided to keep your debt.';
    //     });
    // };
});