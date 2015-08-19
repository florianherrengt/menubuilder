'use strict';

var _bind = Function.prototype.bind;
angular.module('example', ['lbServices', 'example.welcome', 'example.food', 'example.login', 'example.menu', 'ngMaterial', 'ngNewRouter', 'pascalprecht.translate']).config(['$translateProvider', 'LoopBackResourceProvider', function ($translateProvider, LoopBackResourceProvider) {
    //LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    $translateProvider.translations('en', {
        'FOOD': {
            'PLACEHOLDER': 'Choose or create food...',
            'CREATE_FROM': 'Create new food: {{ label }}'
        }
    });
    $translateProvider.translations('fr', {
        'FOOD': {
            'PLACEHOLDER': 'Choisir ou créer un aliments ...',
            'CREATE_FROM': 'Créer un nouvel aliment: {{ label }}',
            'CREATED': 'Aliment "{{ label }}" créé'
        },
        'PROTEINS': {
            TEXT: 'Protéines',
            SYMBOL: 'P'
        },
        'CARBS': {
            TEXT: 'Carbs',
            SYMBOL: 'C'
        },
        'FAT': {
            TEXT: 'Fat',
            SYMBOL: 'F'
        },
        'ACTIONS': {
            'CREATE': 'Créer'
        }
    });

    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy('escaped');
}]).controller('AppController', ['$router', AppController]);

function AppController($router) {
    $router.config([{ path: '/', redirectTo: '/welcome' }, { path: '/welcome', component: 'welcome' }, { path: '/food', component: 'food' }, { path: '/menu', component: 'menu' }, { path: '/login', component: 'login' }]);
}

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
function register(appName) {

    var app = angular.module(appName);

    return {
        directive: directive,
        controller: controller,
        service: service,
        provider: provider,
        factory: factory
    };

    function directive(name, constructorFn) {

        constructorFn = _normalizeConstructor(constructorFn);

        if (!constructorFn.prototype.compile) {
            // create an empty compile function if none was defined.
            constructorFn.prototype.compile = function () {};
        }

        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        _override(constructorFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (constructorFn.prototype.link) {
                    return constructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = _createFactoryArray(constructorFn);

        app.directive(name, factoryArray);
        return this;
    }

    function controller(name, contructorFn) {
        app.controller(name, contructorFn);
        return this;
    }

    function service(name, contructorFn) {
        app.service(name, contructorFn);
        return this;
    }

    function provider(name, constructorFn) {
        app.provider(name, constructorFn);
        return this;
    }

    function factory(name, constructorFn) {
        constructorFn = _normalizeConstructor(constructorFn);
        var factoryArray = _createFactoryArray(constructorFn);
        app.factory(name, factoryArray);
        return this;
    }

    /**
     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
     * we need to pull out the array of dependencies and add it as an $inject property of the
     * actual constructor function.
     * @param input
     * @returns {*}
     * @private
     */
    function _normalizeConstructor(input) {
        var constructorFn;

        if (input.constructor === Array) {
            //
            var injected = input.slice(0, input.length - 1);
            constructorFn = input[input.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = input;
        }

        return constructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param constructorFn
     * @returns {Array.<T>}
     * @private
     */
    function _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            //return new constructorFn(...args);
            var instance = new (_bind.apply(constructorFn, [null].concat(args)))();
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
}
'use strict';

angular.module('example.food', []).controller('FoodController', ['$q', '$timeout', '$translate', '$mdToast', 'User', FoodController]);

function FoodController($q, $timeout, $translate, $mdToast, User) {
    var that = this;

    this.querySearch = function () {
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
        $translate('FOOD.CREATE_FROM', { label: this.searchText }).then(function (label) {
            //debugger;
            User.food({
                id: User.getCurrentId(),
                filter: {
                    where: { label: { like: that.searchText.toLowerCase() } },
                    limit: 10
                }
            }, function (food) {
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
    this.createFood = function () {
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
        }, function () {
            that.searchText = '';
            that.nutritionalValue = {};
            $translate('FOOD.CREATED', { label: label }).then(function (createdMsg) {
                $mdToast.show($mdToast.simple().content(createdMsg).position('bottom right').hideDelay(3000));
            });
        });
    };
}

FoodController.prototype.updateKcal = function () {
    var proteins = parseInt(this.nutritionalValue.proteins);
    var carbs = parseInt(this.nutritionalValue.carbs);
    var fat = parseInt(this.nutritionalValue.fat);
    this.nutritionalValue.kcal = proteins * 4 + carbs * 4 + fat * 9;
};

FoodController.prototype.searchTextChange = function () {};

FoodController.prototype.selectedItemChange = function (item) {
    if (item && item.value !== 'new') {
        this.nutritionalValue = item.nutritionalValue;
        console.log(item);
    } else {
        this.nutritionalValue = {};
    }
};
'use strict';

angular.module('example.login', []).controller('LoginController', ['User', LoginController]);

function LoginController(User) {
    this.user = {
        email: 'a@b.com',
        password: 'abc'
    };
    this.login = function () {
        User.login(this.user, function () {
            console.log('lo');
        }, function () {
            console.log('login failed');
        });
    };
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MenuController = (function () {
    function MenuController() {
        _classCallCheck(this, MenuController);

        console.log('MenuController loaded');
        this.label = 'Welcome to The New Angular Router Demo!';
    }

    // register('example').controller('MenuController', MenuController);

    _createClass(MenuController, [{
        key: 'menuFn',
        value: function menuFn(item) {
            // console.log('MenuController menuFn() called');
            console.log('from MenuController', item);
            // return 'hello';
        }
    }, {
        key: 'onNotFound',
        value: function onNotFound(item) {
            console.log('create a new item ', item);
        }
    }]);

    return MenuController;
})();

angular.module('example.menu', ['searchFood']).controller('MenuController', MenuController);
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var WelcomeController = function WelcomeController() {
    _classCallCheck(this, WelcomeController);

    this.heading = 'Welcome to The New Angular Router Demo!';
};

angular.module('example.welcome', []).controller('WelcomeController', WelcomeController);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SearchFoodController = (function () {
    function SearchFoodController(User) {
        _classCallCheck(this, SearchFoodController);

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

    _createClass(SearchFoodController, [{
        key: 'querySearch',
        value: function querySearch() {
            return this.User.food({
                id: this.User.getCurrentId(),
                filter: {
                    where: { label: { like: this.searchText.toLowerCase() } },
                    limit: 10
                }
            });
        }
    }, {
        key: 'searchTextChange',
        value: function searchTextChange() {
            console.log('text change');
        }
    }, {
        key: 'selectedItemChange',
        value: function selectedItemChange(item) {
            console.log('from directive', item);
            this.seletedFood({ item: item });
        }
    }, {
        key: 'onNotFound',
        value: function onNotFound(searchText) {
            console.log(searchText + ' not found');
            this.notFound({ item: { label: searchText } });
        }
    }]);

    return SearchFoodController;
})();

angular.module('searchFood', []).directive('searchFood', function () {
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
//# sourceMappingURL=app.js.map