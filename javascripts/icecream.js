var test = angular.module("icecream", ["monospaced.qrcode"]);

test.config([
    '$compileProvider',
    function($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|bitcoin):/);
    }
]);

function IcecreamCtrl($scope, $http) {
    $scope.items = [
    { id:'magnumclassic',   name:'Magnum Classic',       address:'1PduF4SebKT7QxKoSzUrwN9D4miSZyF9Yj', price:0.002, euro:1.0 },
    { id:'magnumgold',      name:'Magnum Gold',          address:'1PgPdq7XgSdyV8uhY22Cj77LAxSn1HgrUz', price:0.002, euro:1.0 },
    { id:'magnumalmond',    name:'Magnum Almond',        address:'1KjeRKq52ipXjcaDq8pMvtvJvWeVuHHW4F', price:0.002, euro:1.0 },
    { id:'magnumyoghurt',   name:'Magnum Yoghurt Fresh', address:'13uNdtFG5Aat5Vwjfze1dYdnjnarbwKFma', price:0.002, euro:1.0 },
    { id:'flutschfinger',   name:'Flutsch Finger',       address:'1EeX9JGgicy8nowntp7e88xa7iHKwZhETY', price:0.001, euro:0.5 },
//    { id:'split',           name:'CujaMara Split',       address:'16qwAKeC9xqEUfzid85uvSVMqXz5SSFvCW', price:0.0016, euro:0.8 },
    { id:'snickers',        name:'Snickers Ice Cream',   address:'12z2fCDTHQec7UJrpeStVwdPS22T7GXoW5', price:0.0016, euro:0.8 },
    { id:'magnummini',      name:'Magnum Mini',          address:'12dxXp3wVJmzrzqxGSh3GfEQ3C2ruUcLpf', price:0.0013, euro:0.7 },
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

