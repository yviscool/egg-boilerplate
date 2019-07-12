import * as ratelimit from "koa-ratelimit";
import { Application } from 'egg';

export default function (opt, app: Application) {

    const db = app.redis;

    if (!db) {
        return async (ctx, next) => {
            return await next();
        }
    }

    return ratelimit(Object.assign(opt, { db }));

}