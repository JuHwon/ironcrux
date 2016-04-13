'use strict';

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import RequestTime from './utils/request-time';
import * as path from 'path';
import serve = require('koa-static');
const convert = require('koa-convert');

var app: Koa = module.exports = new Koa();

var router: KoaRouter = new KoaRouter();

var rootDir = path.join(__dirname, '../../');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV || 'dev';

app.use(RequestTime('X-Response-Time'));

switch (environment) {
    case 'build':
        //TODO: implement build environment server
        break;

    default:
        console.log('*** DEV ***');
        app.use(convert(serve(path.join(rootDir, './src/client'))));
        app.use(convert(serve(path.join(rootDir, './'))));
        //app.use(convert(serve(path.join(rootDir, './tmp'))));
        break;
}

app.listen(port, function() {
   console.log(`Koa server listening on port ${port}...`);
});