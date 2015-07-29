angular.module('example.login', []).
    controller('LoginController', ['User', LoginController]);

function LoginController(User) {
    this.user = {
        email: 'a@b.com',
        password: 'abc'
    };
    this.login = function() {
        User.login(this.user, function() {
            console.log('lo')
        }, function() {
            console.log('login failed');
        });
    };
}
