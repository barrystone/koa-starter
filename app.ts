import koa, { Context } from 'koa';
import koaRouter from 'koa-router';
import json from 'koa-json';

const app = new koa();
const router = new koaRouter();

// Json prettier middleware
app.use(json());

// Simple middleware example
// app.use(async (ctx: Context) => (ctx.body = { msg: 'Hello World' }));

router.get('/test', (ctx) => (ctx.body = 'test'));
// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started...'));
