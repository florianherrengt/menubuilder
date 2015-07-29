module.exports = function(app) {
    console.log();
    app.models.user.create({
        email: 'a@b.com',
        password: 'abc'
    });
};
