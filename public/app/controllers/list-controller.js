(function (ng, app) {
    "use strict";

    app.controller( "ListController", ["$scope", "$http", function ($scope, $http) {


        $http.get("/data.json").success(function (data) {
            $scope.compains = data;
        })

        this.addCompany = function(company){
            company.active = true;
        }


        $scope.selectedCompains = [];

        $scope.onSelectValue = function($item, $model, $label) {
            $scope.selectedCompains.push($item);
        }

    }]);
})(angular, MyApp);