angular.module('menumanager').controller('MenuCtrl', function($scope, User) {
    $scope.menu = User.menu({ id: User.getCurrentId() });
    User.menu.create({ id: User.getCurrentId() }, {
        label: Math.random()
    });
});
