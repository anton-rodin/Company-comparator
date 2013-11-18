(function (ng, app) {
    "use strict";

    app.controller( "ListController", ["$scope", "$http", "$element", "Stramgraph", function ($scope, $http, $element, Stramgraph) {

        var maxLength = 8;

        $http.get("/data.json").success(function (data) {
            $scope.compains = data;
        })

        this.clickToCompany = function(company){
            if ($scope.selectedCompains.length < maxLength) {
                company.active ? $scope.removeCompany(company) : $scope.onSelectValue(company);
            }

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

        $scope.showList = false;
        $scope.selectedCompains = [];

        $scope.onSelectValue = function(company) {
            if ($scope.selectedCompains.length < maxLength) {
                var position = $scope.selectedCompains.indexOf(company);

                if (position === -1) {
                    $scope.selectedCompains.push(company);
                }
                $scope.typedText = "";
                company.active = true;

                onSelectedCompainChanged();
            }
        }
        $scope.removeCompany = function(company) {
            var position = $scope.selectedCompains.indexOf(company);

            $scope.selectedCompains.splice(position, 1);
            company.active = false;

            onSelectedCompainChanged();
        }

    }]);
})(angular, MyApp);