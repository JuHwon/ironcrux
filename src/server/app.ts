'use strict';

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import RequestTime from './utils/request-time';

var app: Koa = new Koa();
var router: KoaRouter = new KoaRouter();

var port = 3000;

app.use(RequestTime('X-Response-Time'));

app.use(async (ctx: Koa.Context) => {
    ctx.body = 'Hello World\n';
});

app.listen(port, function() {
   console.log(`Koa server listening on port ${port}...`);
});