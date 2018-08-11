import mongoose from 'mongoose'
import Promise from 'bluebird'
import { dbUrl } from '../config'

mongoose.Promise = Promise

mongoose.connect(dbUrl).then(
    () => {
        console.log(`mongodb connection success`)
    },
    err => {
        console.error(`mongodb connection failed`, err)
    }
)
