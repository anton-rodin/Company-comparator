(function (ng, app) {
    "use strict";

    app.controller( "ListController", ["$scope", "$http", "$element", "Stramgraph", function ($scope, $http, $element, Stramgraph) {


        $http.get("/data.json").success(function (data) {
            $scope.compains = data;
        })

        this.addCompany = function(company){
            company.active = true;
        }
        $scope.focusToInput = function() {
            $element.find('input')[0].focus();
        }


        function onSelectedCompainChanged(){
            if ($scope.selectedCompains.length > 1) {
                $scope.showGraph = true;
                Stramgraph.render(document.getElementById('timeline'), $scope.selectedCompains, 350, 500)
            } else {
                $scope.showGraph = false;
            }

        }

        $scope.selectedCompains = [];

        $scope.onSelectValue = function($item, $model, $label) {

            var position = $scope.selectedCompains.indexOf($item);

            if (position === -1) {
                $scope.selectedCompains.push($item);
            }
            $scope.typedText = "";

            onSelectedCompainChanged();
        }
        $scope.removeCompany = function($item) {
            var position = $scope.selectedCompains.indexOf($item);

            $scope.selectedCompains.splice(position, 1);
            onSelectedCompainChanged();
        }

    }]);
})(angular, MyApp);