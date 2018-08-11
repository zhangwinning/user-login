const app = require('./app')

const serverAgent = require('supertest').agent(app.callback())
global.serverAgent = serverAgent


module.exports = serverAgent
