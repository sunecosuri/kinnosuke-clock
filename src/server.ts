import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Work from './work'
import { IEnterBody } from '../interfaces'

const app = new Koa();
const router = new Router();

router.post('/sample', async (ctx: Koa.Context) => {
    const body: IEnterBody = ctx.request.body
    const work = new Work(body)
    await work.start()
})

app
.use(BodyParser())
.use(router.routes())

app.listen(3000);
