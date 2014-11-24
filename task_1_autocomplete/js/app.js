var app = angular.module('travelAutocomplete', ['ngResource', 'angular-repeat-n']);

app.factory('Hotels', function($resource) {
    return $resource(
        'https://level.travel/papi/references/hotels?js=true' +
        '&key=da4ad28030cfa998eedb7da1943e1b37&api_version=2&query=:query',
        {},
        {
            search: {method: 'GET', isArray: true}
        }
    );
});

app.factory('Countries', function($resource) {
    var api = $resource(
        'https://level.travel/papi/references/countries?js=true' +
        '&key=da4ad28030cfa998eedb7da1943e1b37&api_version=2',
        {},
        {
            getAllCountries: {method: 'GET', isArray: true}
        }
    );

    var iso2ToNameObject = {};

    var countries = api.getAllCountries();

    countries.$promise.then(function() {
        for (var i in countries) {
            var country = countries[i];
            iso2ToNameObject[country.iso2] = country.name_ru;
        }
    });

    return {
        iso2ToName: iso2ToNameObject
    };
});

app.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element) {
            $timeout(function() {
                element[0].focus();
            });
        }
    };
});

app.controller('HotelsAutocomplete', function($scope, Hotels, Countries) {
    $scope.hotels = [];

    $scope.refresh = function() {
        Hotels.search({
            query: $scope.query
        }, function(data) {
            $scope.hotels = data;
        });
    };

    $scope.iso2ToName = Countries.iso2ToName;
});
