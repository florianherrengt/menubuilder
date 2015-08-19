class MenuController {
    constructor() {
        console.log('MenuController loaded');
        this.label = 'Welcome to The New Angular Router Demo!';
    }

    menuFn(item) {
        // console.log('MenuController menuFn() called');
        console.log('from MenuController', item);
        // return 'hello';
    }

    onNotFound(item) {
        console.log('create a new item ', item);
    }
}
// register('example').controller('MenuController', MenuController);
angular.module('example.menu', ['searchFood']).
    controller('MenuController', MenuController);
