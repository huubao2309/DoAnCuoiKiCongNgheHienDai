(function (app) {
    app.controller('productEditController', productEditController);

    productEditController.$inject = ['apiService', '$scope', 'notificationService', '$state', 'commonService', '$stateParams'];

    function productEditController(apiService, $scope, notificationService, $state, commonService, $stateParams) {
        $scope.product = {};
        $scope.ckeditorOptions = {
            languague: 'vi',
            height: '200px'
        }
        $scope.UpdateProduct = UpdateProduct;
        $scope.moreImages = [];
        $scope.GetSeoTitle = GetSeoTitle;

        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }

        function loadProductDetail() {
            apiService.get('api/product/getbyid/' + $stateParams.id, null, function (result) {
                console.log(result.data);
                $scope.product = result.data;
                $scope.moreImages = JSON.parse($scope.product.MoreImages);
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }
        function UpdateProduct() {
            $scope.product.MoreImages = JSON.stringify($scope.moreImages)
            apiService.put('api/product/update', $scope.product,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    $state.go('products');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
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
        loadProductDetail();
    }

})(angular.module('baodatshop.products'));