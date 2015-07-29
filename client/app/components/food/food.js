angular.module('example.food', []).
    controller('FoodController', ['$q', '$timeout', '$translate', '$mdToast', 'User', FoodController]);

function FoodController($q, $timeout, $translate, $mdToast, User) {
    var that = this;

    this.querySearch = function() {
        var deferred = $q.defer();
        var results = [{
            value: 'saumon',
            display: 'Saumon',
            nutritionalValue: {
                proteins: 10,
                carbs: 20,
                fat: 10
            }
        }, {
            value: 'avocat',
            display: 'Avocat',
            nutritionalValue: {
                proteins: 10,
                carbs: 20,
                fat: 10
            }
        }];
        $translate('FOOD.CREATE_FROM', { label: this.searchText }).then(function(label) {
            //debugger;
            User.food({
                id: User.getCurrentId(),
                filter: {
                    where: { label: { like: that.searchText.toLowerCase() } },
                    limit: 10
                }
            }, function(food) {
                food.unshift({
                    value: 'new',
                    label: label,
                    searchedText: that.searchText
                });
                deferred.resolve(food);
            });
            //$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        });
        return deferred.promise;
    };
    this.createFood = function() {
        //User.food.create({
            //label:
        //});
        var label = this.searchText.split(': ');
        if (label.length > 1) {
            label = label[1];
        } else {
            label = label[0];
        }
        User.food.create({ id: User.getCurrentId() }, {
            label: label,
            nutritionalValue: this.nutritionalValue
        }, function() {
            that.searchText = '';
            that.nutritionalValue = {};
            $translate('FOOD.CREATED', { label: label }).then(function(createdMsg) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(createdMsg)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
        });
    };
}

FoodController.prototype.updateKcal = function() {
    var proteins = parseInt(this.nutritionalValue.proteins);
    var carbs = parseInt(this.nutritionalValue.carbs);
    var fat = parseInt(this.nutritionalValue.fat);
    this.nutritionalValue.kcal = proteins * 4 + carbs * 4 + fat * 9;
};

FoodController.prototype.searchTextChange = function() {
};

FoodController.prototype.selectedItemChange = function(item) {
    if (item && item.value !== 'new') {
        this.nutritionalValue = item.nutritionalValue;
        console.log(item);
    } else {
        this.nutritionalValue = {};
    }
};

