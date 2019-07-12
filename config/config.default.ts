import 'module-alias/register';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ConnectionOptions } from 'typeorm';
import { ResultInterceptor, TimeoutInterceptor } from '@common/Interceptor';
import { HttpExceptionFilter } from '@common/HttpExceptionFilter';
import { ValidationPipe } from 'egg-pig';

type TypeOrmConfig = {
  type: string;
  host: string;
  username: string;
  database: string;
  port: number;
  synchronize: boolean;
  logging: boolean;
} | ConnectionOptions;


interface ExtendsConfig {
  typeorm: TypeOrmConfig
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & ExtendsConfig;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562205018873_1185';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: false
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    maxAge: 600,
  };

  
  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    enable: true,
    appid: process.env.EGG_ALINODE_APPID || '',
    secret: process.env.EGG_ALINODE_SECRET || '',
  };


  config.typeorm = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: "root",
    database: 'test',
    port: 3306,
    synchronize: true,
    logging: false,
  };


  // 全局属性验证器
  config.globalPipes = [new ValidationPipe({
    transform: true,
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })];

  // 全局异常捕获
  config.globalFilters = [HttpExceptionFilter];

  // 全局过滤器
  config.globalInterceptors = [TimeoutInterceptor, ResultInterceptor];

  // the return config will combines to EggAppConfig
  return config;
};
