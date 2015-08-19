class WelcomeController {
    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
angular.module('example.welcome', []).
    controller('WelcomeController', WelcomeController);
