import Koa from 'koa'
import logger from 'koa-logger'
import api from './api'
import bodyParser from 'koa-bodyparser'
import { responseHandler, crossDomain}  from './middlewares'
import { port, host } from './config'

require('./utils/mongodb')

let app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(responseHandler())
app.use(crossDomain)

app.use(api.routes()).use(api.allowedMethods())
app.listen(port, host)
console.log(`url: http://${host}:${port}`)

module.exports = app  // 便于测试
