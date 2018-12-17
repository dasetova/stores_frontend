var app = angular.module("storeAdmin", ["ngRoute"]);

app.constant('urls', {
    BASE: 'http://localhost:4000/',
    STORE_SERVICE_API : 'http://localhost:4000/api/stores/'
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/stores.html",
        controller : "StoreController",
        controllerAs:'ctrl',
        resolve: {
            stores: function ($q, StoreService) {
                console.log('Load all stores');
                var deferred = $q.defer();
                StoreService.loadAllStores().then(deferred.resolve, deferred.resolve);
                return deferred.promise;
            }
        }
    });
});

// ,
//         controllerAs:'ctrl',
//         resolve: {
//             stores: function ($q, StoreService) {
//                 console.log('Load all stores');
//                 var deferred = $q.defer();
//                 StoreService.loadAllStores().then(deferred.resolve, deferred.resolve);
//                 return deferred.promise;
//             }
//         }