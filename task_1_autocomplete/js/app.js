var app = angular.module('travelAutocomplete', ['ngResource']);

app.factory("Hotels", function($resource) {
    return $resource("https://level.travel/papi/references/hotels?"
                     "js=true&key=da4ad28030cfa998eedb7da1943e1b37&"
                     "api_version=2&query=:query");
});

app.controller("HotelsAutocomplete", function($scope, Hotels) {
    $scope.hotels = [];

    $scope.refresh = function() {
        Hotels.get({
            query: query
        }, function(data) {
            $scope.hotels = data;
        });
    };
});
