import koa, { Context } from 'koa';
import koaRouter from 'koa-router';
import json from 'koa-json';
import path from 'path';
import render from 'koa-ejs';
import bodyParser from 'koa-bodyparser';

const app = new koa();
const router = new koaRouter();

// Replace with DB
const things = ['Programming', 'Sport', 'Music'];

// Json prettier middleware
app.use(json());
// Body middleware
app.use(bodyParser());

// Add additional properties to context
app.context.user = 'barry';

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
router.post('/add', add);

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
// Add thing
async function add(ctx: Context) {
  const body: any = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

router.get('/user', (ctx: Context) => (ctx.body = `welcome ${ctx.user}!`));
// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started...'));
