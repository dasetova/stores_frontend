'use strict';
 
angular.module('storeAdmin').factory('StoreService',
    ['$window', '$http', '$q', 'urls',
        function ($window, $http, $q, urls) {
 
            var factory = {
            	loadAllStores, loadAllStores,
                getAllStores: getAllStores,
                createStore: createStore,
                updateStore: updateStore,
                deleteStore: deleteStore
            };
 
            return factory;
 
            function loadAllStores() {
                console.log('Fetching stores');
                console.log(urls.STORE_SERVICE_API);
                
                var deferred = $q.defer();
                $http.get(urls.STORE_SERVICE_API)
                    .then(
                        function (response) {
                            console.log('Fetched successfully stores');
                            $window.localStorage.stores = JSON.stringify(response.data);
                            console.log(response.data)
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading stores');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
            
            function getAllStores(){
                return JSON.parse($window.localStorage.stores);
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
