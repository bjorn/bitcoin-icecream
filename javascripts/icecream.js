var test = angular.module("icecream", ["monospaced.qrcode"]);

test.config([
    '$compileProvider',
    function($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|bitcoin):/);
    }
]);

function IcecreamCtrl($scope, $http) {
    $scope.items = [
    { id:'flutschfinger',   name:'Flutsch Finger',       address:'1NZFMywLV4vZDqtFPEoeF58Ym7vo5oA7eQ', price:0.001, euro:0.5 },
    { id:'split',           name:'CujaMara Split',       address:'16qwAKeC9xqEUfzid85uvSVMqXz5SSFvCW', price:0.0016, euro:0.8 },
    { id:'snickers',        name:'Snickers Ice Cream',   address:'1EnqYmVHS1h5eBeP3SHSLZYmDr2pAZAuiR', price:0.0016, euro:0.8 },
    { id:'magnummini',      name:'Magnum Mini',          address:'1Ci5tZrC2opG15oW4TWdNT8vEj922nuMqe', price:0.0013, euro:0.7 },
//    { id:'magnumalmond',    name:'Magnum Almond',        address:'13JFwsGPLNtQnkgPYcqugKnkFwaiE1dUTt', price:0.002, euro:1.0 },
    { id:'magnumyoghurt',   name:'Magnum Yoghurt Fresh', address:'1JneKd8QbToVo2TNvrgEkQQrAz9MrbGVXm', price:0.002, euro:1.0 },
   { id:'magnumgold',      name:'Magnum Gold',          address:'1PgPdq7XgSdyV8uhY22Cj77LAxSn1HgrUz', price:0.002, euro:1.0 },
   { id:'magnumclassic',   name:'Magnum Classic',       address:'1PduF4SebKT7QxKoSzUrwN9D4miSZyF9Yj', price:0.002, euro:1.0 },
//    { id:'magnummini',      name:'Magnum Mini',          address:'17G2pAaupxEDTSxoVZL3CQrCxBbTD6b6WS', price:0.0016, euro:0.8 },
    ];

    $scope.init = function () {
        angular.forEach($scope.items, function(item) {
            item.url = "bitcoin:" + item.address + "?amount=" +  item.price + "&label=" + item.name.replace(/ /g, '%20');
        });
        // check if there is query in url
        // and fire search in case its value is not empty
    };

    $http.get('https://api.bitcoinaverage.com/ticker/global/EUR/last')
        .success(function (data) {
             $scope.exchangeRate = data;
         })
         .error(function (data, status, headers, config) {
             //  Do some error handling here
         });

    $scope.addTodo = function() {
        $scope.ote,s.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.items, function(item) {
            count += item.price;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTodos = $scope.items;
        $scope.items = [];
        angular.forEach(oldTodos, function(items) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
}

