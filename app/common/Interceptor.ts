import { map } from 'rxjs/operators';
import { ExecutionContext, CallHandler, HttpStatus, EggInterceptor } from 'egg-pig';

export class ResultInterceptor extends EggInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler<any>) {
    return call$.handle().pipe(map(res => {
      if (!res) {

      } else {
        const { code = HttpStatus.OK, msg = 'success', data = null } = res;
        return {
          code,
          msg,
          data,
        }
      }
    }));
  }
}