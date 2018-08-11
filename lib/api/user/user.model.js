
import mongoose from 'mongoose'
import crypto from 'crypto'
import { pick } from 'lodash'

const SALT = 'x'

const UserSchema = new mongoose.Schema({
    email       :   { type  : String,  unique: true},

    password    :   { type  : String,  required : true},

}, {versionKey: false, timestamps: true})


//密码加密函数
const cryptoPassword = function (password) {
    let hash = crypto.createHash('sha1')
    return hash.update(password + SALT).digest('hex')
}

// 保存之前加钩子
UserSchema.pre('save', function (next) {
    const user = this
    if (!user['password']) return next()
    user.password = cryptoPassword(user.password)
    return next()
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    return cryptoPassword(candidatePassword) === this.password
}
export default mongoose.model('user', UserSchema)
