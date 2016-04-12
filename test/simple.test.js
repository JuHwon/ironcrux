'use strict';
const chai = require('chai');
const request = require('supertest');
var expect = chai.expect;
var api = require('../src/server/app.js');
describe('node server', function () {
    it('sends http status 200', (done) => {
        var app = api;
        request(app.listen())
            .get('/')
            .expect(200)
            .end(done);
    });
    it('has set X-Response-Time', (done) => {
        var app = api;
        request(app.listen())
            .get('/')
            .expect((res) => {
            if (res.header['x-response-time'] === undefined) {
                throw new Error('x-response-time not set');
            }
        })
            .end(done);
    });
});
