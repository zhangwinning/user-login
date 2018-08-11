import Router from 'koa-router'

import {
    register,
    login,
} from "./user.controller";

import { auth } from '../../middlewares'

const router = new Router()

//----------------------------------用户注册----------------------------------

/**
 * @api {POST} /api/user/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam (body) {String} email 邮箱
 * @apiParam (body) {String} password 密码
 *
 * @apiSuccess {Number} status 0表示成功，1表示`邮箱或密码为空`, 2表示`邮箱已经注册过`, 3表示`密码过于简单`
 * @apiSuccess {String} mgs 创建成功或者失败的提示
 * @apiSuccessExample {json} 成功返回
 {
   status: 0,
   msg: 'success'
   user:
    { _id: '5afa47a43ea025dd6a91326c',
      email: '1527841714@qq.com',
      role: [] },
   }
 }
 *
 */
router.post('/register', register)


/**
 * @api {POST} /api/user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam (body) {String} email 邮箱
 * @apiParam (body) {String} password 密码
 *
 * @apiSuccess {Number} status 0表示成功，1表示用户还没激活，2：`用户名或者密码不可为空`， 3：`用户还没注册，请先注册` 4： `登录密码错误`
 * @apiSuccess {String} mgs 创建成功或者失败的提示
 * @apiSuccessExample {json} 成功返回
 {
   status: 0,
   msg: 'success'
   user:
    { _id: '5afa47a43ea025dd6a91326c',
      email: '1527841714@qq.com',
      token: 'ey....' },
   }
 }
 *
 */
router.post('/login', login)


/**
 * @api {GET} /api/user/logout 用户退出
 * @apiName logout
 * @apiGroup User
 *
 * @apiSuccess {Number} status  0表示成功，非0表示失败
 * @apiSuccess {String} mgs 创建成功或者失败的提示
 * @apiSuccessExample {json} 成功返回
 {
   status: 0,
   msg: 'success'
 }
 */
// router.get('/logout', auth.isAuthenticated(), logout)

export default router
