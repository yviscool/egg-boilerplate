// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRatelimit from '../../../app/middleware/ratelimit';

declare module 'egg' {
  interface IMiddleware {
    ratelimit: typeof ExportRatelimit;
  }
}
