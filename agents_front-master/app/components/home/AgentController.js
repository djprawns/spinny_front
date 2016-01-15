MyApp.controller('AgentController', function($scope, $mdDialog, $animate, $http, SharedDataService, $location, $mdToast, $q, $timeout, Upload, SharedComponents, ApiConfig) {
    // $scope.agents;
    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };
    $scope.showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };

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
                // console.log('asd');
            });
    };
    // $scope.archived = SharedDataService.getArchive();
    
});

function DialogController($scope, $mdDialog, SharedDataService, $mdToast, Upload, SharedComponents, ApiConfig) {
    console.log(ApiConfig.backend);
    $scope.agents.agents.count++;
    $scope.cities = SharedDataService.Cities();
    $scope.cities = $scope.cities[0];
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
            // else {
            //     $scope.agent.id_proof_image = '';
            // }
            if (typeof id_proof_image_1 != "undefined") {
                files.push(id_proof_image_1);
                images.push('id_proof_image_1');
            }
            // else {
            //     $scope.agent.id_proof_image_1 = '';
            // }
            if (typeof id_proof_image_2 != "undefined") {
                files.push(id_proof_image_2);
                images.push('id_proof_image_2');
            }
            // else {
            //     $scope.agent.id_proof_image_2 = '';
            // }
            if (typeof rc_proof_image != "undefined") {
                files.push(rc_proof_image);
                images.push('rc_proof_image');
            }
            // else {
            //     $scope.agent.rc_proof_image = '';
            // }
            if (typeof rc_proof_image_1 != "undefined") {
                files.push(rc_proof_image_1);
                images.push('rc_proof_image_1');
            }
            // else {
            //     $scope.agent.rc_proof_image_1 = '';
            // }
            
            var obj = angular.extend(fields, $scope.agent);
            if(obj.group == 'GDS-Markup') {
                obj.type = 'DESK';
            }
            console.log(ApiConfig.backend);
            console.log($scope.agents);

    //         $scope.agents.push('{
    //   "alt_phone": "None",
    //   "is_owner_of_vehicle": "True",
    //   "last_name": "",
    //   "rc_proof_image_1": "",
    //   "pending_amount": "0.0",
    //   "city_id": 1,
    //   "profession": "('',)",
    //   "agent": "8225033331",
    //   "time_update": "2015-08-24 09:30:27.425479+00:00",
    //   "alt_email": "",
    //   "inductor": "Prithvi",
    //   "happay": "AGENT567 prathamtoursandtravels@yahoo.com",
    //   "signing_credits_given": "True",
    //   "city": "Delhi",
    //   "first_name": "",
    //   "middle_name": "",
    //   "locality": "(IDR>)",
    //   "zo_credits": "2000",
    //   "time_create": "2015-08-24T09:30:27.352629+00:00",
    //   "total_roomnights": 0,
    //   "city_rep": "pranay_b",
    //   "date_of_birth": "",
    //   "rc_proof_image": "",
    //   "type": "DESK",
    //   "email": "prathamtoursandtravels@yahoo.com",
    //   "id_proof_image_2": "",
    //   "id_proof_image_1": "",
    //   "preferred_cities": "",
    //   "id_proof_image": "",
    //   "company": "(Pratham Tours & Travels)",
    //   "agent_id": "567",
    //   "address": "111-112, Baikundthdham Colony, old Palasia",
    //   "id_proof_type": "(OTHER)",
    //   "vehicle_type": "('',)",
    //   "name": "Priyanka Soni",
    //   "total_amount": "0.0",
    //   "gender": "F",
    //   "id_proof_number": "(u'',)",
    //   "card_id": "HCARD0005268",
    //   "customer_type": "OTHERS",
    //   "fathers_name": "",
    //   "bank_details": "None",
    //   "registration_number": ""
    // }');
            // $scope.agents.count++;
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
                // console.log($scope.agent);
                if (response.data.success == true) {
                    SharedDataService.getAgent(response.data.agent_id).then(function(response){
                        // console.log(response.data.agent[0]);
                        response.data.agent[0].zo_credits = parseFloat(response.data.agent[0].zo_credits);
                        response.data.agent[0].total_roomnights = parseFloat(response.data.agent[0].total_roomnights);
                        $scope.agents.push(response.data.agent[0]);
                    });
                    // $scope.agents.push({
                    //     name: $scope.agent.name,
                    //     zo_credits: 0,
                    //     agent: $scope.agent.mobile,
                    //     total_roomnights: 0,
                    //     agent_id: response.data.agent_id
                    // });
                    $scope.showSimpleToast(response.data.message);
                } else {
                    $scope.showSimpleToast(response.data.message);
                }
            });
        }
        $mdDialog.hide(answer);
    };
}