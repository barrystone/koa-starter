import koa, { Context } from 'koa';
import koaRouter from 'koa-router';
import json from 'koa-json';
import path from 'path';
import render from 'koa-ejs';

const app = new koa();
const router = new koaRouter();

// Replace with DB
const things = ['Programming', 'Sport', 'Music'];

// Json prettier middleware
app.use(json());

// Simple middleware example
// app.use(async (ctx: Context) => (ctx.body = { msg: 'Hello World' }));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Routes
router.get('/', index);
router.get('/add', showAdd);

// List of things
async function index(ctx: Context) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things: things
  });
}
// Show add page
async function showAdd(ctx: Context) {
  await ctx.render('add');
}

router.get('/test', (ctx: Context) => (ctx.body = 'test'));
// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started...'));
