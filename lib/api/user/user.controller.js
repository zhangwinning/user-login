import User from './user.model.js'
import {trim, set} from 'lodash'
import jwt from 'jsonwebtoken'
import { secret } from '../../config.js'



//-----------------------------------------------注册登录、重置密码逻辑----------------------------------------------

/**
 * 注册用户
 * @param ctx
 * @returns {Promise<{status: number, msg: string}>}
 */
export async function register(ctx) {
    let {email, password} = ctx.request.body
    if (!email || !password) return ctx.body = { status: 1, msg: '邮箱或密码不可为空'}
    let exist = await User.findOne({email: email}, '_id').lean().exec()
    if (exist) return ctx.body = { status: 2, msg: `邮箱"${email}"已经注册过`}
    let newUserDoc = {email, password}
    let user = await new User(newUserDoc).save()
    ctx.body = { user : user }
}



/**
 * 登录
 * @param ctx
 * @returns {Promise<*>}
 */
export async function login(ctx) {
    let {email, password} = ctx.request.body
    console.log('======>', ctx.request, email, password)
    if (!email || !password) return ctx.body = { status: 2, msg: '用户名或者密码不可为空'}
    let user = await User.findOne({email: email}, '_id email password isActivity').exec()
    if (!user) return ctx.body = {status: 3, msg: '用户还没注册，请先注册'}
    if (!user.comparePassword(password)) return ctx.body = {status: 4, msg: '登录密码错误'}
    let id = user['_id'].toString()
    let token = jwt.sign({'id': id}, secret, {expiresIn: "7d"})    //expired in 7 days
    ctx.cookies.set('token', token, {expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}) //expired in 7 day
    set(user, 'token', token)
    ctx.body = { status: 0, user : user }
}

/**
 * 退出登录
 * @param ctx
 * @returns {Promise<*>}
 */
export async function logout(ctx) {
    ctx.cookies.set('token', '')
    ctx.body = { }
}


