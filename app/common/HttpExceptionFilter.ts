import { HttpException, ExceptionFilter, Catch, HttpStatus } from 'egg-pig';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';

@Catch(EntityNotFoundError, QueryFailedError, HttpException)
export class HttpExceptionFilter extends ExceptionFilter {

    catch(exception: HttpException | QueryFailedError | EntityNotFoundError) {

        const { ctx } = this;

        let statusCode = HttpStatus.OK;

        if (exception instanceof HttpException) {

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

        } else if (exception instanceof EntityNotFoundError) {

            statusCode = HttpStatus.NOT_FOUND;

        } else {

            statusCode = HttpStatus.BAD_REQUEST;

        }

        if (statusCode !== HttpStatus.OK) {

            ctx.logger.error(`[unhandled exception] ${JSON.stringify(exception)}`)

            ctx.status = statusCode;

            ctx.body = { code: statusCode, error: exception.message, }
        }



    }
}