import { HttpException, ExceptionFilter, Catch, HttpStatus } from 'egg-pig';

@Catch(HttpException)
export class HttpExceptionFilter extends ExceptionFilter {
    catch(exception: HttpException) {
        const { ctx } = this;

        const res = exception.getResponse();

        const { statusCode: code, error, message: msg } = res as any;

        if (code && code === HttpStatus.BAD_REQUEST) {
            ctx.logger.warn(`[bad_request] ${JSON.stringify(res)}`)
        } else if (/40\d/.test(code)) {
            ctx.logger.warn(`[unauthorized] ${JSON.stringify(res)}`)
        } else {
            ctx.logger.error(`[unhandled exception] ${JSON.stringify(res)}`)
        }

        ctx.status = code;
        ctx.body = { code, error, msg }

    }
}