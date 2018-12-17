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
        controllerAs:'ctrl'
    })
    .when("/:store_id/products", {
        templateUrl : "views/products.html",
        controller : "ProductController",
        controllerAs:'ctrl'
    });
});
