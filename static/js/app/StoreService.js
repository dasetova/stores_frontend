'use strict';
 
angular.module('storeAdmin').factory('StoreService',
    ['$http', '$q', 'urls',
        function ($http, $q, urls) {
 
            var factory = {
            	getAllStores: getAllStores,
                createStore: createStore,
                updateStore: updateStore,
                deleteStore: deleteStore
            };
 
            return factory;
            
            function getAllStores(){
                var deferred = $q.defer();
                $http.get(urls.STORE_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Fetched successfully stores');
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading stores');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createStore(name, address, phone, logo){
                var deferred = $q.defer();
                $http.post(
                    urls.STORE_SERVICE_API,
                    {
                        store: {
                            name: name,
                            address: address,
                            phone: phone,
                            logo: logo
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

            function updateStore(id, name, address, phone, logo){
                var deferred = $q.defer();
                $http.put(
                    urls.STORE_SERVICE_API + '/' + id,
                    {
                        store: {
                            name: name,
                            address: address,
                            phone: phone,
                            logo: logo
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

            function deleteStore(id){
                var deferred = $q.defer();
                $http.delete(
                    urls.STORE_SERVICE_API + '/' + id
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
