import { throwError } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';
import { ExecutionContext, CallHandler, HttpStatus, EggInterceptor, HttpException, GatewayTimeoutException } from 'egg-pig';



// 统一返回
export class ResultInterceptor extends EggInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(res => {
      if (res) {
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


// 超时
export class TimeoutInterceptor extends EggInterceptor {

  defaultTimeout: number;

  constructor(timeout: number = 5000) {
    super()
    this.defaultTimeout = timeout;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      timeout(this.defaultTimeout),
      catchError(error => {
        if (error.name === 'TimeoutError') {
          // return throwError(new GatewayTimeoutException("接口超时"));
          throw new GatewayTimeoutException("接口超时");
        }
        throw error;
      }),
    );
  }
}