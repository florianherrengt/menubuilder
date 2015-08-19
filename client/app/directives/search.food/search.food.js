class SearchFoodController {
    constructor(User) {
        this.User = User;
        User.food.create({ id: User.getCurrentId() }, {
            label: 'label' + Math.random().toString(),
            nutritionalValue: this.nutritionalValue
        });
        console.log('search food directive controller loaded');
        // console.log(this);
        // console.log('from directive' + this.menuFn());
        this.testVar = 'sdf';
        this.label = 'this should not change';
    }

    querySearch() {
        return this.User.food({
            id: this.User.getCurrentId(),
            filter: {
                where: { label: { like: this.searchText.toLowerCase() } },
                limit: 10
            }
        });
    }

    searchTextChange() {
        console.log('text change');
    }

    selectedItemChange(item) {
        console.log('from directive', item);
        this.seletedFood({ item });
    }

    onNotFound(searchText) {
        console.log(searchText + ' not found');
        this.notFound({ item: { label: searchText } });
    }
}

angular.module('searchFood', []).directive('searchFood', () => {
    return {
        transclude: true,
        scope: {},
        bindToController: {
            seletedFood: '&',
            notFound: '&'
        },
        restrict: 'E',
        controllerAs: 'ctrl',
        templateUrl: 'directives/search.food/search.food.html',
        controller: ['User', SearchFoodController]
    };
});