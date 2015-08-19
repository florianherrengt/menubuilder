/*eslint-env node, jasmine */
describe('sorting the LOG_INFOst of users', () => {
    let scope;
    let welcomeController;
    beforeEach(module('example'));
    
    beforeEach(inject(($rootScope, $controller) => {
        scope = $rootScope.$new();
        welcomeController = $controller('WelcomeController', {
            $scope: scope
        });
    }));
    
    it('sorts in descending order by default', () => {
        console.log(welcomeController.heading);
        expect(welcomeController.heading).toBe('Welcome to The New Angular Router Demo!');
    });
});
