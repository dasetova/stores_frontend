'use strict';
 
angular.module('storeAdmin').controller('SaleController',
['SaleService', 'ProductService', '$routeParams', function(SaleService, ProductService, $routeParams) {
    var self = this;
    self.store_id = $routeParams.store_id;
    // Form attributes
    self.id="";
    self.customer_identification_number="";
    self.selectedProduct = null;
    self.itemQuantity = 1;
    self.itemUnitPrice = 0;
    self.items=[];

    // General attributes
    self.title="Sale List";
    self.successMessage="";
    self.errorMessage="";
    self.showDetailItems=-1;

    // Methods
    self.products = getAllProducts();
    self.sales = getAllSales();
    self.removeItem = removeItem;
    self.removeItemAdded = removeItemAdded;
    self.changeShow = changeShow;
    self.changePrice = changePrice;
    self.addItem = addItem;
    
    self.submit = submit;
    self.reset = reset;
    
    function getAllProducts(){
        ProductService.getAllProducts(self.store_id).then(
            function (response) {
                self.products = response.data;
            },
            function (errResponse) {
                console.error(errResponse);
        });
    }

    function getAllSales(){
        SaleService.getAllSales(self.store_id).then(
            function (response) {
                self.sales = response.data;
                console.log(response.data);
            },
            function (errResponse) {
                console.error(errResponse);
        });
    }

    function submit(){
        if (self.items.length == 0){
            self.errorMessage = "Must add at least one item to sale";
        } else {
            SaleService.createSale(self.store_id, self.customer_identification_number, self.items).then(
                function(response){
                    self.successMessage = "Sale created";
                    getAllSales();
                    reset();
                    console.log(response.data);
                },
                function (errResponse) {
                    self.errorMessage = "Can't create sale";
                    console.error(errResponse);
                }
            );
        }
    }

    function reset() {
        self.id="";
        self.customer_identification_number="";
        self.items = [];
    }

    function removeItem(item_id) {
        console.log(`removing ${item_id}`);
    }

    function changeShow (index){
        console.log("calling show: " + index);
        self.showDetailItems = index;
    }

    function changePrice(){
        self.itemUnitPrice = self.selectedProduct.unit_price;
    }

    function addItem(){
        if (self.selectedProduct == null || self.itemQuantity == 0 || self.itemUnitPrice == 0){
            self.errorMessage = "There is an error in the item to add. Please select a product an assign quantity and price greater than zero";
        }else{
            var newItem = {
                product: self.selectedProduct,
                quantity: self.itemQuantity,
                unit_price: self.itemUnitPrice,
                product_id: self.selectedProduct.id
            }
            self.items.push(newItem);
            resetItemAddition();
        }
    }

    function resetItemAddition(){
        self.selectedProduct = null;
        self.itemQuantity = 1;
        self.itemUnitPrice = 0;
    }

    function removeItemAdded(index){
        self.items.splice(index, 1);
    }
}
]);