angular.module('example', [
  'lbServices',
  'example.welcome',
  'example.food',
  'example.login',
  'ngMaterial',
  'ngNewRouter',
  'pascalprecht.translate'
])
.config(['$translateProvider', 'LoopBackResourceProvider', function($translateProvider, LoopBackResourceProvider) {
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
}])
.controller('AppController', ['$router', AppController]);

function AppController($router) {
  $router.config([
    { path: '/', redirectTo: '/welcome' },
    { path: '/welcome', component: 'welcome' },
    { path: '/food', component: 'food' },
    { path: '/login', component: 'login' }
  ]);
}
