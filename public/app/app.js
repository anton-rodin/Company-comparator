var MyApp = angular.module('app', ['ui.bootstrap'])
    .run(['$rootScope', 'Stramgraph', function($rootScope, Stramgraph) {


        var data = [
            {
                "id": 1,
                "title": "Little Inc",
                "metrics": {
                    "offers": 665,
                    "shares": 20,
                    "landings": 1124,
                    "leads": 1102,
                    "purchases": 88,
                    "friends": 74
                }
            },
            {
                "id": 2,
                "title": "Marvin LLC",
                "metrics": {
                    "offers": 20,
                    "shares": 4,
                    "landings": 20,
                    "leads": 25,
                    "purchases": 28,
                    "friends": 18
                }
            },
            {
                "id": 3,
                "title": "Hodkiewicz, Jacobson and O'Conner",
                "metrics": {
                    "offers": 834,
                    "shares": 8,
                    "landings": 759,
                    "leads": 683,
                    "purchases": 41,
                    "friends": 35
                }
            },
            {
                "id": 4,
                "title": "Harber, Fahey and Berge",
                "metrics": {
                    "offers": 233,
                    "shares": 5,
                    "landings": 352,
                    "leads": 348,
                    "purchases": 31,
                    "friends": 25
                }
            }
        ];


    }]);