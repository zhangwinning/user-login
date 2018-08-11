export default async function(ctx, next) {
    ctx.response.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    ctx.response.set('Access-Control-Allow-Headers', 'Identity,Cms,Token,Appkey,X-PINGOTHER,Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Auth-App-Store')

    ctx.response.set('Access-Control-Allow-Credentials', true)
    // ctx.response.set('Access-Control-Allow-Methods', 'PATCH,PUT,POST,GET,DELETE,OPTIONS')
    // ctx.response.set('X-Powered-By', ' 3.2.1')
    await next()
}
