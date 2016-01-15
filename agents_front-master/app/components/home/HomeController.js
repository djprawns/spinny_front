MyApp.controller('HomeController', function($scope, $mdDialog, $animate, $http, SharedDataService, $location, $mdToast, $q, $timeout, Upload, SharedComponents, ApiConfig) {
    // SharedDataService.getAgentsApi(1).then(function(data) {
    //     console.log(data);
    //     $scope.agents = data;
    //     angular.forEach($scope.agents, function(agent) {
    //         agent.zo_credits = parseFloat(agent.zo_credits);
    //         agent.total_roomnights = parseFloat(agent.total_roomnights);
    //     });
    //     $scope.total_agents = SharedDataService.getTotalAgents();
    //     $scope.hideSpan = true;
    //     $scope.agents.count = $scope.total_agents;
    // });
    $scope.addAgent = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/components/home/addagent-dialog.tmpl.html',
                parent: angular.element(document.body),
                scope: $scope.$new(),
                targetEvent: ev,
                // locals:{
                //     items: $scope.agents,
                //     parent: $scope
                // },
            })
            .then(function(answer) {}, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
});

function DialogController($scope, $mdDialog, SharedDataService, $mdToast, Upload, SharedComponents, ApiConfig) {
    console.log(ApiConfig.backend);
    // $scope.agents.agents.count++;
    // $scope.agents.all_bookings.count++;
    $scope.states = SharedDataService.States();
    // console.log($scope.states);
    $scope.states = $scope.states[0];
    $scope.getCities = function(state_id) {
        // console.log(city_id);
        SharedDataService.getCities(state_id).
        then(function(response) {
            $scope.cities = SharedDataService.Cities();
            console.log($scope.cities);
        });
    };
    $scope.gds = function(value) {
        if (value == 'GDS-Solo') {
            $scope.happay = false;
            $scope.lock = false;
        } else if (value == 'GDS-Corporate') {
            $scope.happay = true;
            $scope.lock = false;
        } else {
            $scope.happay = false;
            $scope.lock = true;
        }
    }
    $scope.value = function(value) {
        if (value == 'VEHICLE') {
            $scope.vehicle = true;
        } else {
            $scope.vehicle = false;
        }
        if (value == 'DESK') {
            $scope.desk = true;
        } else {
            $scope.desk = false;
        }
        if (value == 'OTHER') {
            $scope.other = true;
        } else {
            $scope.other = false;
        }
    }
    $scope.newValue = function(value) {
        console.log(value);
    }
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        console.log($scope.agents);
        $mdDialog.cancel();
    };
    $scope.answer = function(answer, file) {
        if (answer != 'Cancel') {
            var fields = {
                'email': '',
                'alt_email': '',
                'city_id': '',
                'locality': '',
                'address': '',
                'id_number': '',
                'cardkit': '',
                'id_number':'',
                'id_type': '',
                'bank_name': '',
                'bank_branch': '',
                'ifsc': '',
                'ac_number': '',
                'preferred_cities': '',
                'company': '',
                'vehicle_type': '',
                'owner': '',
                'registration': '',
                'profession': '',
                'customer_type': '',
                'date_of_birth': '',
                'father': '',
                'inductor': '',
                'advanced': '',
                'alt_mobile': ''
            };
            var id_proof_image = $scope.agent.id_proof_image;
            var id_proof_image_1 = $scope.agent.id_proof_image_1;
            var id_proof_image_2 = $scope.agent.id_proof_image_2;
            var rc_proof_image = $scope.agent.rc_proof_image;
            var rc_proof_image_1 = $scope.agent.rc_proof_image_1;
            delete $scope.agent.id_proof_image;
            delete $scope.agent.id_proof_image_1;
            delete $scope.agent.id_proof_image_2;
            delete $scope.agent.rc_proof_image;
            delete $scope.agent.rc_proof_image_1;
            var files = [];
            var images = [];
            if (typeof id_proof_image != "undefined") {
                files.push(id_proof_image);
                images.push('id_proof_image');
            }
            if (typeof id_proof_image_1 != "undefined") {
                files.push(id_proof_image_1);
                images.push('id_proof_image_1');
            }
            if (typeof id_proof_image_2 != "undefined") {
                files.push(id_proof_image_2);
                images.push('id_proof_image_2');
            }
            if (typeof rc_proof_image != "undefined") {
                files.push(rc_proof_image);
                images.push('rc_proof_image');
            }
            if (typeof rc_proof_image_1 != "undefined") {
                files.push(rc_proof_image_1);
                images.push('rc_proof_image_1');
            }
            
            var obj = angular.extend(fields, $scope.agent);
            if(obj.group == 'GDS-Markup') {
                obj.type = 'DESK';
            }

            var upload = Upload.upload({
              url: ApiConfig.backend+'/api/rep/agent',
              method: 'POST',
              fields: obj,
              file: files,
              fileFormDataName: images
            }).success(function(data){
                if(data.success) {
                    SharedDataService.getAgent(data.agent_id).
                    then(function(response){
                        response.data.agent[0].zo_credits = parseFloat(response.data.agent[0].zo_credits);
                        response.data.agent[0].total_roomnights = parseFloat(response.data.agent[0].total_roomnights);
                        $scope.agents.push(response.data.agent[0]);
                        $scope.agents.count++;
                    });
                    SharedComponents.showSimpleToast(data.message);
                }
                else {
                    SharedComponents.showSimpleToast(data.message);
                }
            });

            SharedDataService.saveAgent(obj).then(function(response) {
                if (response.data.success == true) {
                    SharedDataService.getAgent(response.data.agent_id).then(function(response){
                        // console.log(response.data.agent[0]);
                        response.data.agent[0].zo_credits = parseFloat(response.data.agent[0].zo_credits);
                        response.data.agent[0].total_roomnights = parseFloat(response.data.agent[0].total_roomnights);
                        $scope.agents.push(response.data.agent[0]);
                    });
                    $scope.showSimpleToast(response.data.message);
                } else {
                    $scope.showSimpleToast(response.data.message);
                }
            });
        }
        $mdDialog.hide(answer);
    };
}