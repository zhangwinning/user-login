import { set } from 'lodash';

export default () => {
    return async (ctx, next) => {
        try {
            await next();
            if (ctx.body) {
                set(ctx.body, 'status', ctx.body.status || 0);
                set(ctx.body, 'msg', ctx.body.msg || 'success');
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error(err, err.stack);
            }
            ctx.status = err.status || 500;
            ctx.body = {
                status: ctx.status,
                msg: err.msg || err.toString(),
            };
        }
    };
};
