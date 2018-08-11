import User from './user'
import Router from 'koa-router'
const router = new Router()

import { debug } from '../middlewares'

router.use('/*', debug)

router.use('/api/user', User.routes(), User.allowedMethods())
module.exports = router
