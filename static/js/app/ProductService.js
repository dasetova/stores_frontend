'use strict';
 
angular.module('storeAdmin').factory('ProductService',
    ['$http', '$q', 'urls',
        function ($http, $q, urls) {
 
            var factory = {
            	getAllProducts: getAllProducts,
                createProduct: createProduct,
                updateProduct: updateProduct,
                deleteProduct: deleteProduct
            };
 
            return factory;
            
            function getAllProducts(store_id){
                var deferred = $q.defer();
                $http.get(urls.STORE_SERVICE_API + '/' + store_id + '/products')
                    .then(
                        function (response) {
                            console.log('Fetched successfully products');
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading products');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createProduct(store_id, name, description, available_quantity, unit_price){
                var deferred = $q.defer();
                $http.post(
                    urls.STORE_SERVICE_API + '/' + store_id + '/products',
                    {
                        product: {
                            name: name,
                            description: description,
                            available_quantity: available_quantity,
                            unit_price: unit_price
                        }
                    }
                ).then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
                
            }

            function updateProduct(store_id, product_id, name, description, available_quantity, unit_price){
                var deferred = $q.defer();
                $http.put(
                    urls.STORE_SERVICE_API + '/' + store_id + '/products/' + product_id,
                    {
                        product: {
                            name: name,
                            description: description,
                            available_quantity: available_quantity,
                            unit_price: unit_price
                        }
                    }
                ).then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
                
            }

            function deleteProduct(store_id, product_id){
                var deferred = $q.defer();
                $http.delete(
                    urls.STORE_SERVICE_API + '/' + store_id + '/products/' + product_id,
                ).then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        deferred.reject(errResponse);
                    }
                );
                return deferred.promise;
                
            }
        }
]);
