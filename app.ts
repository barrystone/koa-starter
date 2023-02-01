import koa, { Context } from 'koa';

const app = new koa();

// app.use(async (ctx: Context) => (ctx.body = 'Hello World'));
app.use(async (ctx: Context) => (ctx.body = { msg: 'Hello World' }));

app.listen(3000, () => console.log('Server started...'));
