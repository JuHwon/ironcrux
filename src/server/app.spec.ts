'use strict';

import { expect } from 'chai';
import request = require('supertest');
const srv: any = require('./app');

describe('node server', function() {    
    var app: any;
    
    beforeEach(() => {
        app = srv.listen();
    });
    
    it('sends http status 200', (done) => {        
        request(app)        
            .get('/')
            .expect(200)
            .end(done);
    });
    
    it('has set X-Response-Time', (done) => {
        request(app)        
            .get('/')
            .expect((res: any) => {
                expect(res.header['x-response-time']).exist;
            })
            .end(done);
    });
    
});