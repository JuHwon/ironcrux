'use strict';

import * as Koa from 'koa';
import * as Moment from 'moment';

export default function requestTime(headerName: String) {
    return async (ctx: Koa.Context, next: Function) => {
        var start: Moment.Moment = Moment.utc();
        await next();
        var ms: number = Moment.utc().diff(start);
        ctx.set(headerName, ms + 'ms');
    };
}