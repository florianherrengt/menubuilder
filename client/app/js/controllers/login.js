angular.module('menumanager').controller('LoginCtrl', function($scope, $location, User) {
    $scope.email = 'florian@skim.it';
    $scope.password = 'a';
    $('.modal-trigger').leanModal({
        dismissible: false
    });
     $('#modal1').openModal();
    $scope.login = function() {
        User.login({ rememberMe: true }, {
            email: $scope.email,
            password: $scope.password
        }, function() {
            var next = $location.nextAfterLogin || '/';
              $location.nextAfterLogin = null;
              $location.path(next);
        });
    };
    $scope.register = function() {
        User.create({
            email: $scope.email,
            password: $scope.password
        });
    };
    // User.create({
    //     email: $scope.email,
    //     password: $scope.password
    // });
});
