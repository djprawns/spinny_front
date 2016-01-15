MyApp.controller('EditController', function($scope, SharedDataService, $routeParams, $rootScope, $mdToast, Upload, SharedComponents, ApiConfig, $timeout) {

        $scope.states_edit = SharedDataService.States();
        $scope.states_edit = $scope.states_edit[0];
        $scope.getCities = function(state_id) {
            SharedDataService.getCities(state_id).
            then(function(response) {
                $scope.cities = SharedDataService.Cities();
                console.log($scope.cities);
            });
        };
        $timeout( function(){

            console.log($scope.$parent.temp);
                    var id_proof, id_proof_1, id_proof_2, rc_proof, rc_proof_1;
                    if ($scope.$parent.temp.id_proof_image!='') {
                        id_proof = ApiConfig.backend + $scope.$parent.temp.id_proof_image;
                    }
                    else {
                        id_proof = './assets/img/shutterstock_261719003.jpg';
                    }
                    if ($scope.$parent.temp.id_proof_image_1!='') {
                        id_proof_1 = ApiConfig.backend + $scope.$parent.temp.id_proof_image_1;
                    }
                    else {
                        id_proof_1 = './assets/img/shutterstock_261719003.jpg';
                    }
                    if ($scope.$parent.temp.id_proof_image_2!='') {
                        id_proof_2 = ApiConfig.backend + $scope.$parent.temp.id_proof_image_2;
                    }
                    else {
                        id_proof_2 = './assets/img/shutterstock_261719003.jpg';
                    }
                    if ($scope.$parent.temp.rc_proof_image!='') {
                        rc_proof = ApiConfig.backend + $scope.$parent.temp.rc_proof_image;
                    }
                    else {
                        rc_proof = './assets/img/shutterstock_261719003.jpg';
                    }
                    if ($scope.$parent.temp.rc_proof_image_1!='') {
                        rc_proof_1 = ApiConfig.backend + $scope.$parent.temp.rc_proof_image_1;
                    }
                    else {
                        rc_proof_1 = './assets/img/shutterstock_261719003.jpg';
                    }
                    $scope.user = {
                        name : $scope.$parent.temp.name,
                        email : $scope.$parent.temp.email,
                        time_create : new Date($scope.$parent.temp.time_create),
                        address : $scope.$parent.temp.address,
                        city_id : $scope.$parent.temp.city_id,
                        locality : $scope.$parent.temp.locality,
                        number : $scope.$parent.temp.agent,
                        city_rep : $scope.$parent.temp.city_rep,
                        inductor : $scope.$parent.temp.inductor,
                        alt_email : $scope.$parent.temp.alt_email,
                        gender : $scope.$parent.temp.gender,
                        date_of_birth : $scope.$parent.temp.date_of_birth,
                        fathers_name : $scope.$parent.temp.fathers_name,
                        id_type : $scope.$parent.temp.id_proof_type,
                        preferred_cities: $scope.$parent.temp.preferred_cities,
                        type: $scope.$parent.temp.type,
                        company: $scope.$parent.temp.company,
                        is_owner_of_vehicle: $scope.$parent.temp.is_owner_of_vehicle,
                        registration_number: $scope.$parent.temp.registration_number,
                        profession: $scope.$parent.temp.profession,
                        customer_type: $scope.$parent.temp.customer_type,
                        agent_id: $scope.$parent.temp.agent_id,
                        id_proof_image: id_proof,
                        id_proof_image_1: id_proof_1,
                        id_proof_image_2: id_proof_2,
                        rc_proof_image: rc_proof,
                        rc_proof_image_1: rc_proof_1
                    }
                    SharedDataService.getCity($scope.user.city_id).
                        then(function (response){
                            $scope.states_edit.state_id = response.state.state_id;
                            SharedDataService.getCities(response.state.state_id).
                            then(function(response) {
                                $scope.cities = SharedDataService.Cities();
                                // console.log($scope.cities);
                            });
                        });
                    $scope.check={};
                    if ($scope.user.type == 'VEHICLE') {
                        $scope.check.vehicle = true;
                    } else {
                        $scope.check.vehicle = false;
                    }
                    if ($scope.user.type == 'DESK') {
                        $scope.check.desk = true;
                    } else {
                        $scope.check.desk = false;
                    }
                    if ($scope.user.type == 'OTHER') {
                        $scope.check.other = true;
                    } else {
                        $scope.check.other = false;
                    }

        }, 1000);
        $scope.gds = function(value) {
            if (value == 'GDS-Solo') {
                $scope.happay = false;
            } else {
                $scope.happay = true;
            }
        }
        $scope.submit = function() {

            var fields = {
                'email': '',
                'alt_email': '',
                'city_id': '',
                'locality': '',
                'address': '',
                'id_number': '',
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
                'alt_mobile': '',
                'profession': '',
                'customer_type' : ''
            };
            var obj = angular.extend(fields, $scope.user);
            for(key in obj) {
                if(typeof obj[key] == "undefined") {
                    obj[key] = "";
                }
                if(obj[key] == null) {
                    obj[key] = "";
                }
            }
            console.log(obj);
            var id_proof_image = $scope.id_proof_image;
            var id_proof_image_1 = $scope.id_proof_image_1;
            var id_proof_image_2 = $scope.id_proof_image_2;
            var rc_proof_image = $scope.rc_proof_image;
            var rc_proof_image_1 = $scope.rc_proof_image_1;
            delete obj.id_proof_image;
            delete obj.id_proof_image_1;
            delete obj.id_proof_image_2;
            delete obj.rc_proof_image;
            delete obj.rc_proof_image_1;
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

            console.log(files);
            console.log(images);

            var upload = Upload.upload({
              url: ApiConfig.backend+'/api/rep/update_agent',
              method: 'POST',
              fields: obj,
              file: files,
              fileFormDataName: images
            }).success(function(data){
                console.log(data);
                SharedDataService.getAgent(obj.agent_id).
                then(function(response_nested) {
                    $scope.$parent.agentId = response_nested.data.agent[0].name;
                    $scope.$parent.mobile = response_nested.data.agent[0].agent;
                    $scope.$parent.email = response_nested.data.agent[0].email;
                    console.log(response_nested.data.agent[0]);
                    console.log($scope.$parent.$parent.tunnel.agents);
                    console.log($scope.$parent.$parent.tunnel.all_bookings);
                    $scope.$parent.$parent.tunnel.agents.forEach(function(entry) {
                        if(entry.agent_id == response_nested.data.agent[0].agent_id) {
                            console.log(entry);
                            entry.name = response_nested.data.agent[0].name;
                            entry.address = response_nested.data.agent[0].address;
                            entry.agent = response_nested.data.agent[0].agent;
                            entry.agent_id = response_nested.data.agent[0].agent_id;
                            entry.alt_email = response_nested.data.agent[0].alt_email;
                            entry.alt_phone = response_nested.data.agent[0].alt_phone;
                            entry.bank_details = response_nested.data.agent[0].bank_details;
                            entry.card_id = response_nested.data.agent[0].card_id;
                            entry.city = response_nested.data.agent[0].city;
                            entry.city_id = response_nested.data.agent[0].city_id;
                            entry.city_rep = response_nested.data.agent[0].city_rep;
                            entry.company = response_nested.data.agent[0].company;
                            entry.customer_type = response_nested.data.agent[0].customer_type;
                            entry.date_of_birth = response_nested.data.agent[0].date_of_birth;
                            entry.email = response_nested.data.agent[0].email;
                            entry.fathers_name = response_nested.data.agent[0].fathers_name;
                            entry.first_name = response_nested.data.agent[0].first_name;
                            entry.gender = response_nested.data.agent[0].gender;
                            entry.happay = response_nested.data.agent[0].happay;
                            entry.id_proof_image = response_nested.data.agent[0].id_proof_image;
                            entry.id_proof_image_1 = response_nested.data.agent[0].id_proof_image_1;
                            entry.id_proof_image_2 = response_nested.data.agent[0].id_proof_image_2;
                            entry.id_proof_number = response_nested.data.agent[0].id_proof_number;
                            entry.id_proof_type = response_nested.data.agent[0].id_proof_type;
                            entry.inductor = response_nested.data.agent[0].inductor;
                            entry.is_owner_of_vehicle = response_nested.data.agent[0].is_owner_of_vehicle;
                            entry.last_name = response_nested.data.agent[0].last_name;
                            entry.locality = response_nested.data.agent[0].locality;
                            entry.middle_name = response_nested.data.agent[0].middle_name;
                            entry.pending_amount = response_nested.data.agent[0].pending_amount;
                            entry.preferred_cities = response_nested.data.agent[0].preferred_cities;
                            entry.profession = response_nested.data.agent[0].profession;
                            entry.rc_proof_image = response_nested.data.agent[0].rc_proof_image;
                            entry.rc_proof_image_1 = response_nested.data.agent[0].rc_proof_image_1;
                            entry.registration_number = response_nested.data.agent[0].registration_number;
                            entry.signing_credits_given = response_nested.data.agent[0].signing_credits_given;
                            entry.time_create = response_nested.data.agent[0].time_create;
                            entry.total_amount = response_nested.data.agent[0].total_amount;
                            entry.total_roomnights = response_nested.data.agent[0].total_roomnights;
                            entry.type = response_nested.data.agent[0].type;
                            entry.vehicle_type = response_nested.data.agent[0].vehicle_type;
                            entry.zo_credits = response_nested.data.agent[0].zo_credits;
                            if(entry.id_proof_image != '') {
                                $scope.user.id_proof_image = ApiConfig.backend+entry.id_proof_image;
                            }
                            if(entry.id_proof_image_1 != '') {
                                $scope.user.id_proof_image_1 = ApiConfig.backend+entry.id_proof_image_1;
                            }
                            if(entry.id_proof_image_2 != '') {
                                $scope.user.id_proof_image_2 = ApiConfig.backend+entry.id_proof_image_2;
                            }
                            if(entry.rc_proof_image != '') {
                                $scope.user.rc_proof_image = ApiConfig.backend+entry.rc_proof_image;
                            }
                            if(entry.rc_proof_image_1 != ''){
                                $scope.user.rc_proof_image_1 = ApiConfig.backend+entry.rc_proof_image_1;
                            }
                        }
                    });
                });
                SharedComponents.showSimpleToast(data.message);
            });
        }
    })
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
