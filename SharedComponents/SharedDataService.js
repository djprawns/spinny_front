spinnyApp.service('SharedDataService', function($http, $location, ApiConfig) {
        var getCars = function() {
            return $http.get(ApiConfig.backend+"polls/cars/").
            then(function(response) {
                return response.data.cars;
            });
        };

        var searchCars = function(value) {
            return $http.get(ApiConfig.backend+"polls/search_cars/", {
                params: {
                    query: value
                }
            }).
            then(function(response) {
                return response.data.result;
            });
        };

        return {
            getCars: getCars,
            searchCars: searchCars
        };
    });