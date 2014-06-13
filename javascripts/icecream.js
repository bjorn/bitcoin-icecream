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
//    { id:'snickers',        name:'Snickers Ice Cream',   address:'1EnqYmVHS1h5eBeP3SHSLZYmDr2pAZAuiR', price:0.0016, euro:0.8 },
//    { id:'magnumalmond',    name:'Magnum Almond',        address:'13JFwsGPLNtQnkgPYcqugKnkFwaiE1dUTt', price:0.002, euro:1.0 },
    { id:'magnumyoghurt',   name:'Magnum Yoghurt Fresh', address:'1JneKd8QbToVo2TNvrgEkQQrAz9MrbGVXm', price:0.002, euro:1.0 },
   { id:'magnumgold',      name:'Magnum Gold',          address:'1FyYcrf4QGg9RxnQRkg7xTv7DCirVDYYri', price:0.002, euro:1.0 },
   { id:'magnumclassic',   name:'Magnum Classic',       address:'18KBcPgdsk1Q6MMEBkM7wh5TPJ38fYsxpP', price:0.002, euro:1.0 },
//    { id:'magnummini',      name:'Magnum Mini',          address:'17G2pAaupxEDTSxoVZL3CQrCxBbTD6b6WS', price:0.0016, euro:0.8 },
    ];

    $scope.init = function () {
        angular.forEach($scope.items, function(item) {
            item.encodedName = "test";
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

