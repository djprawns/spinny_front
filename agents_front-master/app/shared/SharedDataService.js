MyApp.service('SharedDataService', function($http, ApiConfig, $cookies, $location) {
    var agents = [];
    var agent_booking = [];
    var count;
    var agent;
    var all_booking = [];
    var cities = [];
    var archived = [];
    var states = [];
    var all_cities = [];
    var check = function() {
        if ($cookies.get('token')) {

        } else {
            $location.path('/');
        }
    };
    var getAgentsApi = function(page_no, order) {
        check();
        if (!order) {
            order = '';
        }
        return $http.get(ApiConfig.backend + '/api/rep/agents', {
            headers: {
                'Authorization': 'Token ' + $cookies.get('token')
            },
            params: {
                page: page_no,
                ordering: order
            }
        }).
        then(function(response) {
            agents = [];
            agents.push(response.data.agents);
            count = response.data.count;
            return response.data.agents;
        });
    }
    var getAgents = function() {
        return agents;
    }
    var getArchive = function() {
        return $http.get(ApiConfig.backend + '/api/rep/archived_agents').
        then(function(response) {
            archived = response.data.data;
            // console.log(archived.data);
            return archived;
        });
    };
    var getAgent = function(agent_id) {
        var data = {
            'agent_id': agent_id
        };
        return $http.post(ApiConfig.backend + '/api/rep/get_agent', data).
        then(function(response) {
//            console.log(response);
//            console.log(agents);
            if(agents.length != 0) {
                var flag = 0;
                agents[0].forEach(function(entry) {
                    // console.log(entry);
                    if (entry.agent_id == agent_id) {
                        flag = 1;
                        delete entry;
                        agents.push(response.data.agent[0]);
                        // console.log(response.data.agent[0]);
                    }
                });
                // console.log(flag);
                if (!flag) {
                    agents.push(response.data.agent[0]);
                }
            }
            return response;
        });
    }
    var getAgentBookingApi = function(agent_id) {
        agent_booking = [];
        var data = {
            'agent_id': agent_id
        };
        return $http.post(ApiConfig.backend + '/api/rep/booking', data).
        then(function(response) {
            // console.log(response);
            agent_booking.push(response.data);
            return agent_booking;
        });
    }
    var getTotalAgents = function() {
        return count;
    }
    var saveAgent = function(agent) {
        // console.log(JSON.stringify(agent));
        // agent = JSON.stringify(agent);
        return $http.post(ApiConfig.backend + '/api/rep/agent', agent).
        then(function(response) {
            if (response.data.success == true) {
                console.log(agent);
                // agents.push(agent);
            }
            return response;
        });
    }
    var updateAgent = function(agent) {
        return $http.post(ApiConfig.backend + '/api/rep/update_agent', agent).
        then(function(response) {
            // data = {
            //     "agent_id": agent.agent_id
            // };
            // return $http.post('http://localhost:8081/api/rep/get_agent', data).
            // then(function(response) {
            //     for(agents_iter in agents[0]) {
            //         var temp = agents[0];
            //         // console.log(temp[agents_iter]);
            //         if(temp[agents_iter].agent_id == data.agent_id) {
            //             // console.log(temp[agents_iter]);
            //             delete temp[agents_iter];
            //             // temp[agents_iter] = response;
            //             agents[0].push(response.data.agent[0]);
            //         }
            //     }
            //     console.log(agents);
            //     return response;
            // });
            return response;
        });
    }
    var getAllBookings = function(page, order) {
        if (!order) {
            order = '';
        }
        return $http.get(ApiConfig.backend + '/api/rep/get_bookings', {params:{ page:page, order: order } }).
        then(function(response) {
            return response;
        });
    }
    var getSelectedCity = function(city) {
        return city;
    }
    var getPaymentDetails = function(card) {
        data = {
            "card": card
        };
        return $http.post(ApiConfig.backend + '/api/rep/get_payment_details', data).
        then(function(response) {
            return response;
        });
    }
    var repLogin = function(username, password) {
        data = {
            "username": username,
            "password": password
        }
        return $http.post(ApiConfig.backend + '/api/rep/login', data).
        then(function(response) {
//            console.log(response);
            return response;
        });
    }
    var deleteAgent = function(agent) {
        data = {
            'agent_id': agent
        };
        return $http.post(ApiConfig.backend + '/api/rep/delete_agent', data).
        then(function(response) {
            return response;
        });
    }
    var getCities = function(state_id) {
        return $http.get(ApiConfig.backend + '/api/rep/pms_city', {params: { 'state_id': state_id }
    }).
        then(function(response) {
            // console.log(response.data.cities);
            cities = [];
            cities = (response.data.cities);
            // console.log(cities);
        });
    }
    var Cities = function() {
        return cities;
    }
    var searchAgents = function(query) {
        return $http.get(ApiConfig.backend + '/api/rep/search_agents', {
            params: {
                'query': query
            }
        }).
        then(function(response) {
            return response.data;
        });
    }
    var generateCode = function(count, amount) {
        data = {
            'count': count,
            'value': amount
        };
        return $http.post(ApiConfig.backend + '/api/rep/generate_coupon', data).
        then(function(response) {
//            console.log(response.data);
            return response.data;
        });
    };
    var activate_agent = function(agent) {
        data = {
            'agent_id': agent
        };
        return $http.post(ApiConfig.backend + '/api/rep/activate_agent', data).
        then(function(response) {
            return response;
        });
    };
    
    var getAnalytics = function(date) {
        return $http.get(ApiConfig.backend + '/api/rep/analytics', {
            headers: {
                'Authorization': 'Token ' + $cookies.get('token')
            },
            params: {
                date: date
            }
        }).
        then(function(response) {
            return response.data;
        });
    };
    
    var getComparison = function(start_date, end_date) {
        return $http.get(ApiConfig.backend + '/api/rep/comparison', {
            headers: {
                'Authorization': 'Token ' + $cookies.get('token')
            },
            params: {
                date_start: start_date,
                date_end: end_date
            }
        }).
        then(function(response) {
            return response.data;
        });
    };
    
    var getStates = function() {
        return $http.get(ApiConfig.backend + '/api/rep/pms_states').
        then(function(response) {
            states.push(response.data.states);
            // console.log(response.data.cities);
            // cities.push(response.data.cities);
            // console.log(cities);
        });
    };
    var States = function() {
        return states;
    };

    var getCity = function(city_id) {
        return $http.get(ApiConfig.backend + '/api/rep/getCity', { params: {'city_id': city_id}}).then(function(response) {
            return response.data;
        });
    };

    var getonlycities = function() {
        return $http.get(ApiConfig.backend + '/api/rep/cities').
        then(function(response){
            return response.data;
        });
    };
    
    var getVoucherDetails = function(voucher_id, show_branding, show_payment_details, send_mail) {
        return $http.get(ApiConfig.backend + '/api/rep/generate_voucher', 
                         { 
                            headers: {
                                'Authorization': 'Token ' + $cookies.get('token')
                            },
                            params: {
                                'shortcode': voucher_id, 
                                'show_branding': show_branding, 
                                'show_payment_details': show_payment_details, 
                                'mail': send_mail
                            }
        }).then(function(response) {
                return response.data;
        });
    };
    
    return {
        getAgentsApi: getAgentsApi,
        getAgents: getAgents,
        getAgentBookingApi: getAgentBookingApi,
        getTotalAgents: getTotalAgents,
        saveAgent: saveAgent,
        getAgent: getAgent,
        updateAgent: updateAgent,
        getAllBookings: getAllBookings,
        getPaymentDetails: getPaymentDetails,
        repLogin: repLogin,
        deleteAgent: deleteAgent,
        getCities: getCities,
        Cities: Cities,
        searchAgents: searchAgents,
        getArchive: getArchive,
        generateCode: generateCode,
        activate_agent: activate_agent,
        getStates: getStates,
        States: States,
        getCity: getCity,
        getonlycities: getonlycities,
        getAnalytics: getAnalytics,
        getComparison: getComparison,
        getVoucherDetails: getVoucherDetails
    };
});