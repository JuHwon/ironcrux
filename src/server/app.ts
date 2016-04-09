'use strict'

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

var app: Koa = new Koa();
var router: KoaRouter = new KoaRouter();

var port = 3000;


app.use(async (ctx: Koa.Context) => {
    ctx.body = "Hello World\n";
});

app.listen(port, function() {
   console.log(`Koa server listening on port ${port}...`);
});