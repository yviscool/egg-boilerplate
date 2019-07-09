import { HttpException, ExceptionFilter, Catch } from 'egg-pig';

@Catch(HttpException)
export class HttpExceptionFilter extends ExceptionFilter {
    catch(exception: HttpException) {
        const { ctx } = this;
        const { statusCode: code, error, message: msg } = exception.getResponse() as any;
        ctx.body = {
            code,
            error,
            msg,
        }
    }
}