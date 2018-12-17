'use strict';
 
angular.module('storeAdmin').controller('StoreController',
['StoreService', function(StoreService) {
    var self = this;

    // Form attributes
    self.id="";
    self.name="";
    self.address="";
    self.phone="";
    self.logo="https://pngimage.net/wp-content/uploads/2018/06/logos-sin-copyright-png-6.png";
    
    // General attributes
    self.title="Stores List";
    self.successMessage="";
    self.errorMessage="";

    // Methods
    self.stores = getAllStores();
    self.getAllStores = getAllStores();
    self.createStore = createStore;
    self.submit = submit;
    self.reset = reset;
    self.showStore = showStore;
    self.deleteStore = deleteStore;
    self.manageSales = manageSales;
    self.manageProducts = manageProducts;

    function getAllStores(){
        return StoreService.getAllStores();
    }

    function submit(){
        if (self.id == '') {
            createStore();
        }else {
            updateStore();
        }
    }

    function createStore(){
        StoreService.createStore(self.name, self.address, self.phone, self.logo).then(
            function (response) {
                self.stores = getAllStores();
                self.successMessage = "Store " + self.name + " successfully created";
                console.log(response);
                reset();
            },
            function (errResponse) {
                self.errorMessage = "Store " + self.name + " can't be created";
                console.error(errResponse);
        });
    }

    function reset() {
        self.id="";
        self.name="";
        self.address="";
        self.phone="";
        self.logo=""
    }

    function updateStore(){
        StoreService.updateStore(self.id, self.name, self.address, self.phone, self.logo).then(
            function (response) {
                self.successMessage = "Store " + self.id + " successfully updated";
                console.log(response);
                reset();
            },
            function (errResponse) {
                self.errorMessage = "Store " + self.name + " can't be updated";
                console.error(errResponse);
        });
        
    }

    function showStore(id, name, address, phone, logo){
        self.id = id;
        self.name = name;
        self.address = address;
        self.phone = phone;
        self.logo = logo;
    }

    function deleteStore(id){
        StoreService.deleteStore(id).then(
            function (response) {
                self.successMessage = "Store " + id + " successfully deleted";
                console.log(response);
            },
            function (errResponse) {
                self.errorMessage = "Store " + self.name + " can't be deleted";
                console.error(errResponse);
        });
    }

    function manageSales(id){
        console.log("Going to manageSales: " + id);
    }

    function manageProducts(id){
        console.log("Going to manageProducts: " + id);
    }
}
]);
