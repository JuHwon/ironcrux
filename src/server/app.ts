'use strict';

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import RequestTime from './utils/request-time';
import * as path from 'path';
import serve = require('koa-static');
import favicon = require('koa-favicon');
const convert = require('koa-convert');
const fs = require('co-fs');

var app: Koa = module.exports = new Koa();

var router: KoaRouter = new KoaRouter();

var rootDir = path.join(__dirname, '../../');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV || 'dev';

app.use(RequestTime('X-Response-Time'));
app.use(convert(favicon(__dirname + '/favicon.ico')));

switch (environment) {
    case 'build':
        //TODO: implement build environment server
        break;

    default:
        console.log('*** DEV ***');
        console.log('rootDir: ' + rootDir);
        app.use(convert(serve(path.join(rootDir, './src/client'))));
        app.use(convert(serve(path.join(rootDir, './'), { hidden: true })));

        router.get('/*', function *(ctx: KoaRouter.IRouterContext, next: any) {
            this.body = yield fs.readFile(path.join(rootDir, './src/client/index.html'), 'utf-8');
        });
        break;
}

app.use(convert(router.routes()));

app.on('error', (err: Error) => {
   console.log(err);
   console.log('Koa server error occurred.');
});

if (!module.parent) {
    app.listen(port, function() {
        console.log(`Koa server listening on port ${port}...`);
    });
}
