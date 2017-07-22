require('angular')
require('angular-route')

var app = angular.module('myApp', ['ngRoute'])

app.config(['$routeProvider', ($routeProvider)=>{
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'menuCtrl'
        })
        .when('/game', {
            templateUrl: 'views/game.html',
            controller: 'gameCtrl'
        })
}])

app.controller('navTabCtrl', ['$scope', function($scope){
    $scope.tabs = [
        {name: 'Home', active: true, url: '#'},
        {name: 'Menu', active: false, url: '#!menu'},
        {name: 'Game', active: false, url: '#!game'}
    ];

    $scope.changeTab = function (tab) {
        $scope.tabs.forEach((tab)=>{
            tab.active = false;
        })
        tab.active = true;
    }
}])

app.controller('homeCtrl', ['$scope', function($scope){
    
}])

app.controller('menuCtrl', ['$scope', function($scope){
    
}])

app.controller('gameCtrl', ['$scope', function($scope){

    $scope.data = new GameEngine(15, 15, 2).init();

    console.log($scope.data);

    $scope.nbPlayersOptions = {
        2: '2 Players',
        3: '3 Players',
        4: '4 Players'
    }

    $scope.caseStyle = function(caseData) {
        return {
            'background-color': caseData.color,
            'left': caseData.positionX,
            'top': caseData.positionY,
            'width': $scope.data.caseWidth,
            'height': $scope.data.caseHeight
        }
    }

    $scope.caseClass = function(caseData) {
        if (caseData.playerId == $scope.data.currentPlayerId) return 'conquered';
        return '';
    }
}])