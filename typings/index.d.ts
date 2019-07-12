import { Application } from 'egg';
import { Connection } from 'typeorm';
import { Redis, RedisOptions } from "ioredis";
import { toPage as PageHelper } from '../app/extend/helper';

declare module 'egg' {
    export interface Application {
        model: Connection,
        redis: Redis & Singleton<Redis>;
          
    }

    export interface IHelper {
        toPage: PageHelper
    }
    interface EggAppConfig {
        redis: EggRedisOptions;
    }
}