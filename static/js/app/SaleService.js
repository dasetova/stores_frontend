'use strict';
 
angular.module('storeAdmin').factory('SaleService',
    ['$http', '$q', 'urls',
        function ($http, $q, urls) {
 
            var factory = {
            	getAllSales: getAllSales,
                createSale: createSale
            };
 
            return factory;
            
            function getAllSales(store_id){
                var deferred = $q.defer();
                $http.get(urls.STORE_SERVICE_API + '/' + store_id + '/sales')
                    .then(
                        function (response) {
                            console.log('Fetched successfully sales');
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading sales');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createSale(store_id, customer_identification_number, sale_items){
                var deferred = $q.defer();
                $http.post(
                    urls.STORE_SERVICE_API + '/' + store_id + '/sales',
                    {
                        sale: {
                            customer_identification_number: customer_identification_number,
                            sale_items: sale_items
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
        }
]);
