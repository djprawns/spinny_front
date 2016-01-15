MyApp.controller('DataController', function($scope, $mdDialog, $mdToast, $animate, SharedDataService, SharedComponents, $location, $q, $timeout, $cookies, $timeout, $sce) {
    $scope.recreateSelect = true;
    $scope.analyticsMode = false;
    $scope.analyticsDate;
    SharedDataService.getStates();
    SharedDataService.getonlycities().
    then(function(data){
        // console.log(data);
        $scope.cities = data.cities;
    });
    $scope.recreateSelect = true;
    var parentScope = $scope.$parent;
    parentScope.tunnel = $scope;
    // var parentScope1 = $scope.$parent;
    // parentScope1.all_bookings = $scope;
    
    // $scope.agents;
    $scope.searchtext = {
        'query': ''
    };
    $scope.query = {
        filter: '',
        order: '',
        limit: 15,
        page: 1
    };

    $scope.quer = {
        filter: '',
        order: '',
        limit: 15,
        page: 1
    };

    $scope.que = {
        filter: '',
        order: '',
        limit: 15,
        page: 1
    };

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.coupon = {
        'amount': '',
        'number': ''
    };

    // $scope.$watch('searchtext', searchAgents);
    $scope.searchAgents = function($element) {
        $scope.temp = $scope.agents;
        SharedDataService.searchAgents($scope.searchtext.query).then(function(data) {
            $scope.agents = data.data;
            console.log($scope.agents);
        });
    };


    $scope.clearText = function() {
        $scope.searchtext.query = '';
        if ($scope.temp) {
            $scope.agents = $scope.temp;
        }
    };


    $scope.onpagechange = function(page, limit) {
        $scope.hideSpan = false;
        var deferred = $q.defer();
        console.log(deferred);
        console.log($scope.query);
        SharedDataService.getAgentsApi(page, $scope.query.order).then(function(data) {
            $scope.agents = data;
            console.log($scope.agents);
            // angular.forEach(data, function(agent){
            //     $scope.agents = agent;
            // });
            angular.forEach($scope.agents, function(agent) {
                agent.zo_credits = parseFloat(agent.zo_credits);
                agent.total_roomnights = parseFloat(agent.total_roomnights);
            });
            $scope.total_agents = SharedDataService.getTotalAgents();
            $scope.hideSpan = true;
            $scope.agents.count = $scope.total_agents++;
        });

        $timeout(function() {
            deferred.resolve();
        }, 500);

        return deferred.promise;
    };

    $scope.onorderchange_booking = function() {
        SharedDataService.getAllBookings($scope.quer.page, $scope.quer.order).
            then(function(data) {
            $scope.all_bookings = data.data.all_booking;
            $scope.all_bookings.count = data.data.count;
            angular.forEach($scope.all_bookings, function(booking) {
                booking = parseInt(booking.roomnights);
                booking = parseInt(booking.pax);
                booking = parseInt(booking.total_amount);
                booking = parseInt(booking.commission);
            });
            console.log($scope.all_bookings);
        });
    };
    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };

    $scope.onpagechange_booking = function(page, limit) {
        console.log(page);
        // $scope.hideSpan = false;
        // var deferred = $q.defer();
        // console.log(deferred);
        // console.log($scope.query);
        SharedDataService.getAllBookings($scope.quer.page).
            then(function(data) {
            $scope.all_bookings = data.data.all_booking;
            $scope.all_bookings.count = data.data.count;
            angular.forEach($scope.all_bookings, function(booking) {
                booking = parseInt(booking.roomnights);
                booking = parseInt(booking.pax);
                booking = parseInt(booking.total_amount);
                booking = parseInt(booking.commission);
            });
            console.log($scope.all_bookings);
        });
    };

    $scope.onorderchange = function() {
        // console.log("page"+page);
        // console.log("order"+order);
        // console.log($scope.query.page);
        // console.log($scope.query.order);
        var deferred = $q.defer();
        SharedDataService.getAgentsApi($scope.query.page, $scope.query.order).then(function(data) {
            $scope.agents = data;
            console.log($scope.agents);
            // angular.forEach(data, function(agent){
            //     $scope.agents = agent;
            // });
            angular.forEach($scope.agents, function(agent) {
                agent.zo_credits = parseFloat(agent.zo_credits);
                agent.total_roomnights = parseFloat(agent.total_roomnights);
            });
            $scope.total_agents = SharedDataService.getTotalAgents();
            $scope.hideSpan = true;
            $scope.agents.count = $scope.total_agents++;
        });
        $timeout(function () {
          deferred.resolve();
        }, 2000);
        
        return deferred.promise;
      };

    $scope.selectedCity = function(city) {
        $scope.temp = $scope.agents;
        SharedDataService.searchAgents(city).then(function(data) {
            $scope.agents = data.data;
            console.log($scope.agents);
        });
    };

    $scope.clearDropdown = function() {
        // $scope.selected_city = '';
        $scope.recreateSelect = false;
        $timeout(function() {
            $scope.recreateSelect = true;
        }, 100);
        $scope.agents = $scope.temp;
    };

    // $scope.onorderchange = function(order) {
    //     console.log(order);
    //     var deferred = $q.defer();
    //     $timeout(function() {
    //         deferred.resolve();
    //     }, 500);
    //     SharedDataService.getAgentsApi(page, order).then(function(data) {
    //         // $scope.agents = data;
    //         // console.log($scope.agents);
    //         // // angular.forEach(data, function(agent){
    //         // //     $scope.agents = agent;
    //         // // });
    //         // angular.forEach($scope.agents, function(agent) {
    //         //     agent.zo_credits = parseFloat(agent.zo_credits);
    //         //     agent.total_roomnights = parseFloat(agent.total_roomnights);
    //         // });
    //         // $scope.total_agents = SharedDataService.getTotalAgents();
    //         // $scope.hideSpan = true;
    //         // $scope.agents.count = $scope.total_agents++;
    //     });

    //     // $scope.agents.count++;

    //     return deferred.promise;
    // };

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.hideSpan = false;
    SharedDataService.getAgentsApi(1).then(function(data) {
        console.log(data);
        $scope.agents = data;
        angular.forEach($scope.agents, function(agent) {
            agent.zo_credits = parseFloat(agent.zo_credits);
            agent.total_roomnights = parseFloat(agent.total_roomnights);
        });
        $scope.total_agents = SharedDataService.getTotalAgents();
        $scope.hideSpan = true;
        $scope.agents.count = $scope.total_agents;
    });
    SharedDataService.getAllBookings(1).
        then(function(data) {
        $scope.all_bookings = data.data.all_booking;
        $scope.all_bookings.count = data.data.count;
        angular.forEach($scope.all_bookings, function(booking) {
            booking = parseInt(booking.roomnights);
            booking = parseInt(booking.pax);
            booking = parseInt(booking.total_amount);
            booking = parseInt(booking.commission);
        });
        console.log($scope.all_bookings);
    });
    var a = SharedDataService.getAgents();
    console.log($scope.agents);

    SharedDataService.getArchive().
    then(function(response) {
        $scope.archived = response;
        $scope.archived.count = response.length;
    });

    $scope.generateCoupon = function() {
        if ($scope.coupon.amount && $scope.coupon.number) {
            SharedDataService.generateCode($scope.coupon.number, $scope.coupon.amount).
            then(function(response) {
                // console.log(response);
                $scope.generatedCoupon = response.codes;
            });
        } else {
            SharedComponents.showSimpleToast('Please fill all the Fields!');
        }
    };
    $scope.logout = function() {
        $cookies.remove('token');
        $location.path('/');
        SharedComponents.showSimpleToast('Successfully Logged Out');
    };

    $scope.showConfirm = function(ev, agent) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you really like to archive this agent?')
            .content('Be Sure, this action cannot be undone!')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            // console.log(agent);
            SharedDataService.deleteAgent(agent.agent_id).
            then(function(response) {
                if (response.data.success) {
                    SharedDataService.getAgent(data.agent_id).
                    then(function(response){
                        response.data.agent[0].zo_credits = parseFloat(response.data.agent[0].zo_credits);
                        response.data.agent[0].total_roomnights = parseFloat(response.data.agent[0].total_roomnights);
                        $scope.archived.push(response.data.agent[0]);
                        $scope.archived.count++;
                    });
                    var index = $scope.agents.indexOf(agent);
                    $scope.agents.splice(index, 1);
                    $scope.agents.count--;
                    SharedComponents.showSimpleToast(response.data.message);
                } else {
                    SharedComponents.showSimpleToast(response.data.message);
                }
                console.log(response);
            });
            // var index = $scope.agents.indexOf(agent);
            // $scope.agents.splice(index, 1);
            // $scope.showSimpleToast();
            // $scope.agents.count--;
        }, function() {
            $scope.alert = 'You decided to keep your debt.';
        });
    };

    $scope.showConfirmActivate = function(ev, agent) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Would you really like to Activate this agent?')
            .content('Be Sure, this action cannot be undone!')
            .ariaLabel('Lucky day')
            .ok('Yes')
            .cancel('No')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            // console.log(agent);
            SharedDataService.activate_agent(agent.agent_id).
            then(function(response) {
                if (response.data.success) {
                    SharedDataService.getAgent(data.agent_id).
                    then(function(response){
                        response.data.agent[0].zo_credits = parseFloat(response.data.agent[0].zo_credits);
                        response.data.agent[0].total_roomnights = parseFloat(response.data.agent[0].total_roomnights);
                        $scope.agents.push(response.data.agent[0]);
                        $scope.agents.count++;
                    });
                    var index = $scope.archived.indexOf(agent);
                    $scope.archived.splice(index, 1);
                    $scope.archived.count--;
                    SharedComponents.showSimpleToast(response.data.message);
                } else {
                    SharedComponents.showSimpleToast(response.data.message);
                }
                console.log(response);
            });
            // var index = $scope.agents.indexOf(agent);
            // $scope.agents.splice(index, 1);
            // $scope.showSimpleToast();
            // $scope.agents.count--;
        }, function() {
            $scope.alert = 'You decided to keep your debt.';
        });
    };
    
    
//    $scope.onDateChange = function(analyticsDate) {
//        console.log(analyticsDate);
//    
    $scope.$watch("analyticsDate", function(newValue, oldValue){
        if (newValue.getTime() !== oldValue.getTime()) {
            console.log(newValue.getDate());
            console.log(newValue.getTime());
            $scope.hideSpan = false;
            SharedDataService.getAnalytics(newValue.getTime()).
            then(function(response) {
                $scope.hideSpan = true;
                $scope.analytics = response;
            });
        }
    });
    
    $scope.analyticsDate = new Date();
    $scope.analyticsComparisonStartDate = new Date();
    $scope.analyticsComparisonEndDate = new Date();
    SharedDataService.getAnalytics($scope.analyticsDate.getTime()).
        then(function(response) {
            $scope.analytics = response;
        });
    $scope.minDate = new Date(
        $scope.analyticsDate.getFullYear(),
        $scope.analyticsDate.getMonth() - 6,
        $scope.analyticsDate.getDate()
    );
    $scope.maxDate = new Date(
        $scope.analyticsDate.getFullYear(),
        $scope.analyticsDate.getMonth(),
        $scope.analyticsDate.getDate()
    );
    
    $scope.chart = {};
    $scope.chart.labels = [];
    $scope.chart.series = [];
    $scope.chart.data = [
    ];
    
    $scope.compare = function() {
        SharedDataService.getComparison($scope.analyticsComparisonStartDate.getTime(), $scope.analyticsComparisonEndDate.getTime()).
        then(function(response) {
            $scope.chart.labels = response.dates;
            $scope.chart.series = ['Portal', 'Non Portal', 'Total'];
            $scope.chart.data = [response.portal_room_nights, response.non_portal_room_nights, response.total_room_nights]; 
            $scope.analytics.comparison = {};
            $scope.analytics.comparison.portal_bookings = response.portal_total;
            $scope.analytics.comparison.non_portal_bookings = response.non_portal_total;
            $scope.analytics.comparison.total_bookings = response.total;
        });
    }
    
    $scope.voucher = {
        voucher_url:'',
        booking_exists:false,
        show_branding:true,
        show_payment_details:true,
        email:false,
        id:'JAMA41B10140'
    };
    
    $scope.current_voucher_url = '';
    
    $scope.removeVoucher = function() {
        $scope.voucher.voucher_url = "";
        $scope.voucher.pdf = "";
    }
    
    $scope.getVoucher = function() {
        SharedDataService.getVoucherDetails($scope.voucher.id, $scope.voucher.show_branding, $scope.voucher.show_payment_details, false).
        then(function(response) {
            $scope.voucher.booking_exists = response.booking_exists;
            if(!$scope.voucher.booking_exists) {
                SharedComponents.showSimpleToast(response.message);
            } else {
                $scope.voucher.email = response.email;
                $scope.voucher.voucher_url = response.voucher_url;
                $scope.voucher.pdf = response.voucher_pdf;
                $scope.current_voucher_url = $sce.trustAsResourceUrl($scope.voucher.voucher_url);
            }
        });
    }
    
    $scope.mailVoucher = function() {
        SharedDataService.getVoucherDetails($scope.voucher.id, $scope.voucher.show_branding, $scope.voucher.show_payment_details, true).
        then(function(response) {
            SharedComponents.showSimpleToast(response.message);
        });
    }
});