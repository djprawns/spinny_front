var MyApp = angular.module('AgentApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'md.data.table', 'ngFileUpload', 'AgentApp.config', 'ngCookies', 'chart.js']);

MyApp.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true
    });
});