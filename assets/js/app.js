var app = angular.module("spotify", ['ngMaterial']);
app.controller('FetchCtrl', ["$http", "$scope", function($http, $scope) {
    $scope.searchArtist = '';
    $scope.artists = [];
    $scope.artist;
    $scope.sampleArtist = ["Steven Wilson", "Slipknot", "Dream Theater", "Deep Purple"];

    $scope.spotifyData = function() {
        $http.get('https://api.spotify.com/v1/search?type=artist&q=' + $scope.searchArtist).then(function(data) {
            console.log(data);
            $scope.artist.name = data.data.artists.items[0].name;
            $scope.artist.popularity = data.data.artists.items[0].popularity;
            $http.get('https://api.spotify.com/v1/artists/' + data.data.artists.items[0].id + '/top-tracks?country=SE').then(function(response) {
                console.log(response);
                $scope.artist.tracks = response.data.tracks;
                $scope.artists.push($scope.artist);
            })
        });
        console.log($scope.artistNames);
        console.log($scope.artistTracks);
        console.log($scope.artists);
        $scope.searchArtist = '';
        $scope.artist = {};

    }

    $scope.sampleData = function() {
        var addArtist = function(data, artist) {
            $http.get('https://api.spotify.com/v1/artists/' + data.data.artists.items[0].id + '/top-tracks?country=SE')
                .then(function(response) {
                    artist.tracks = response.data.tracks;
                    $scope.artists.push(artist);
                })
        };

        $scope.sampleArtist.map(function(el) {
            $http.get('https://api.spotify.com/v1/search?type=artist&q=' + el)
                .then(function(data) {
                    var artist = {};
                    artist.name = data.data.artists.items[0].name;
                    artist.popularity = data.data.artists.items[0].popularity;

                    addArtist(data, artist);
                })
        })
    }
    $scope.sampleData();

}]);
app.config(function($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('red', {
        'contrastDefaultColor': 'dark',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('red');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('blue')
});

app.directive('artistInfo', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/artist-info.html'
    }
});

app.directive('userInput', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/user-input.html'
    }
});

app.directive('filterDashboard', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/filter-dashboard.html'
    }
});
