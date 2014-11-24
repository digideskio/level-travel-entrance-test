var app = angular.module('travelAutocomplete', ['ngResource']);

app.factory("Hotels", function($resource) {
    return $resource(
        "https://level.travel/papi/references/hotels?js=true" +
        "&key=da4ad28030cfa998eedb7da1943e1b37&api_version=2&query=:query",
        {},
        {
            search: {method: 'GET', isArray: true}
        }
    );
});

app.controller("HotelsAutocomplete", function($scope, Hotels) {
    $scope.hotels = [];

    $scope.refresh = function() {
        Hotels.search({
            query: $scope.query
        }, function(data) {
            $scope.hotels = data;
        });
    };
});
