export default async function debug (ctx, next)  {
    console.log('[DEBUG] request:', ctx.request.method, ctx.request.url,
        {
            params: JSON.stringify(ctx.params),
            query: JSON.stringify(ctx.request.query),
            body: JSON.stringify(ctx.request.body)
        }
    );
    await next();
    console.log('[DEBUG] response:', ctx.request.method, ctx.request.url, ctx.status, JSON.stringify(ctx.body));
}
