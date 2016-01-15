MyApp.service('SharedComponents', function($mdToast) {
    var toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    var getToastPosition = function() {
        return Object.keys(toastPosition)
            .filter(function(pos) {
                return toastPosition[pos];
            })
            .join(' ');
    };
    var showSimpleToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position(getToastPosition())
            .hideDelay(3000)
        );
    };
    return {
        showSimpleToast: showSimpleToast
    }
});