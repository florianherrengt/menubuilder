var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var async = require('async');
var app = require('../server.js');
var agent = supertest.agent(app);;

describe('ACL', function() {
    describe('Menu', function() {
        context('user is not auth', function() {
            it('/api/Menus', function(done) {
                agent
                    .get('/api/Menus')
                    .expect('Content-Type', (/application\/json/))
                    .expect(401, done);
            });
        });
        context('userA is auth', function() {
            testGenerator('A');
        });
        context('userB is auth', function() {
            testGenerator('B');
        });
    });
});

function testGenerator(id, callback) {
    var token;
    var userId;
    it('POST /api/users', function(done) {
        agent
            .post('/api/users')
            .send({ email: 'user' + id + '@fake.com', password: '123' })
            .expect('Content-Type', (/application\/json/))
            .expect(200, done);
    });
    it('POST /api/users/login', function(done) {
        agent
            .post('/api/users/login')
            .send({ email: 'user' + id + '@fake.com', password: '123' })
            .expect('Content-Type', (/application\/json/))
            .expect(200, function(error, response) {
                userId = response.body.userId;
                token = response.body.id;
                done();
            });
    });
    it('should get user info', function(done) {
        agent
            .get('/api/users/' + userId + '?access_token=' + token)
            .expect('Content-Type', (/application\/json/))
            .end(function(error, response) {
                expect(response.body.error).to.be.undefined;
                expect(response.body.email).to.equal('user' + id + '@fake.com');
                done();
            });
    });
    it('should add a menu for this user', function(done) {
        agent
            .post('/api/users/' + userId + '/menu?access_token=' + token)
            .send({ label: 'test' + id })
            .expect('Content-Type', (/application\/json/))
            .end(function(error, response) {
                expect(response.body.error).to.be.undefined;
                expect(response.body.label).to.equal('test' + id);
                expect(response.body.ownerId).to.equal(userId);
                expect(response.body.id).to.not.be.undefined;
                done();
            });
    });
    it('should get all menus for this user', function(done) {
        agent
            .get('/api/users/' + userId + '/menu?access_token=' + token)
            .expect('Content-Type', (/application\/json/))
            .end(function(error, response) {
                expect(response.body.error).to.be.undefined;
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.equal(1);
                expect(response.body[0].label).to.equal('test' + id);
                expect(response.body[0].ownerId).to.equal(userId);
                expect(response.body[0].id).to.not.be.undefined;
                done();
            });
    });
}
