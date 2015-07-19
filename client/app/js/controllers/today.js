angular.module('menumanager').controller('TodayCtrl', function($scope, User) {
    $('.collapsible').collapsible();
    $('.modal-trigger').leanModal();
    $('#circle-proteines').circleProgress({
        value: 0.95,
        size: 140,
        thickness: 15,
        fill: {
            gradient: ["blue"]
        }
    });
    $('#circle-carbs').circleProgress({
        value: 0.15,
        size: 105,
        thickness: 15,
        fill: {
            gradient: ["orange"]
        }
    });
    $('#circle-fat').circleProgress({
        value: 0.55,
        size: 70,
        thickness: 15,
        fill: {
            gradient: ["green"]
        }
    });

    $scope.chooseMeal = function(a) {
        $scope.searchMeal = '';
        $scope.selectedMeal = {
            label: 'Cereals with milk'
        };
        $('#search-meal').val('');
        $('#search-meal').trigger('change');
        $('label[for="search-meal"]').removeClass('active')
    }

    $scope.doSearch = function(str) {
        console.log(str);
    }
});
