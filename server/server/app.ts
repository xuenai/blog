import * as Koa from 'koa';

const app = new Koa();

app.use(ctx => {
    // ctx.body = 'Hello 123';
    ctx.body = 'Hello 1123123 a123sd123'
});
export default app;
