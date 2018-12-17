'use strict';
 
angular.module('storeAdmin').controller('ProductController',
['ProductService', '$routeParams', function(ProductService, $routeParams) {
    var self = this;
    self.store_id = $routeParams.store_id;
    // Form attributes
    self.id="";
    self.name="";
    self.description="";
    self.available_quantity=0;
    self.unit_price=0.0;

    // General attributes
    self.title="Product List";
    self.successMessage="";
    self.errorMessage="";

    // Methods
    self.products = getAllProducts();
    self.getAllProducts = getAllProducts();
    self.createProduct = createProduct;
    self.submit = submit;
    self.reset = reset;
    self.showProduct = showProduct;
    self.deleteProduct = deleteProduct;
    

    function getAllProducts(){
        ProductService.getAllProducts(self.store_id).then(
            function (response) {
                self.products = response.data;
            },
            function (errResponse) {
                console.error(errResponse);
        });
    }

    function submit(){
        if (self.id == '') {
            createProduct();
        }else {
            updateProduct();
        }
    }

    function createProduct(){
        ProductService.createProduct(self.store_id, self.name, self.description, self.available_quantity, self.unit_price).then(
            function (response) {
                getAllProducts();
                self.successMessage = "Product " + self.name + " successfully created";
                reset();
            },
            function (errResponse) {
                self.errorMessage = "Product " + self.name + " can't be created";
                console.error(errResponse);
        });
    }

    function reset() {
        self.id="";
        self.name="";
        self.description="";
        self.available_quantity=0;
        self.unit_price=0.0;
    }

    function updateProduct(){
        ProductService.updateProduct(self.store_id, self.id, self.name, self.description, self.available_quantity, self.unit_price).then(
            function (response) {
                self.successMessage = "Product " + self.id + " successfully updated";
                console.log(response);
                getAllProducts();
                reset();
            },
            function (errResponse) {
                self.errorMessage = "Product " + self.name + " can't be updated";
                console.error(errResponse);
        }); 
    }

    function showProduct(id, name, description, available_quantity, unit_price){
        self.id = id;
        self.name = name;
        self.description = description;
        self.available_quantity = available_quantity;
        self.unit_price = unit_price;
    }

    function deleteProduct(id){
        ProductService.deleteProduct(self.store_id, id).then(
            function (response) {
                self.successMessage = "Product " + id + " successfully deleted";
                console.log(response);
                getAllProducts();
            },
            function (errResponse) {
                self.errorMessage = "Product " + self.name + " can't be deleted";
                console.error(errResponse);
        });
    }
}
]);