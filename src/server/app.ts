'use strict';

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import RequestTime from './utils/request-time';
import * as path from 'path';

var app: Koa = new Koa();
var router: KoaRouter = new KoaRouter();

var rootDir = path.join(__dirname, '../../');
var port = process.env.PORT || 8001;
var environment = process.env.NODE_ENV || 'dev';

app.use(RequestTime('X-Response-Time'));

app.use(async (ctx: Koa.Context) => {
    ctx.body = 'Hello World\n';
});

app.listen(port, function() {
   console.log(`Koa server listening on port ${port}...`);
});