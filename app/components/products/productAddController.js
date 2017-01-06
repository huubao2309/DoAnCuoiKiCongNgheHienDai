﻿(function (app) {
    app.controller('productAddController', productAddController);

    productAddController.$inject = ['apiService', '$scope', 'notificationService', '$state','commonService'];

    function productAddController(apiService, $scope, notificationService, $state, commonService) {
        $scope.product = {
            CreatedDate: new Date(),
            Status: true,
        }
        $scope.ckeditorOptions = {
            languague: 'vi',
            height: '200px'
        }
        $scope.AddProduct = AddProduct;

        $scope.GetSeoTitle = GetSeoTitle;

        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }


        function AddProduct() {

            $scope.product.MoreImages = JSON.stringify($scope.moreImages)
            apiService.post('api/product/create', $scope.product,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    $state.go('products');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }
        function loadProductCategory() {
            apiService.get('api/productcategory/getallparents', null, function (result) {
                $scope.productCategories = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        }
        $scope.ChooseImage = function () {
            cloudinary.openUploadWidget({ cloud_name: 'hcmus-edu', upload_preset: 'pczoogcr' },
              function (error, result) {
                  $scope.$apply(function () {
                      $scope.product.Image = result[0].url;
                  })
              });
        }

        $scope.moreImages = [];

        $scope.ChooseMoreImage = function () {
            cloudinary.openUploadWidget({ cloud_name: 'hcmus-edu', upload_preset: 'pczoogcr' },
              function (error, result) {
                  $scope.$apply(function () {
                      for (var x in result) {
                          $scope.moreImages.push(result[x].url)
                      }
                  })
              });
        }
        loadProductCategory();
    }

})(angular.module('baodatshop.products'));