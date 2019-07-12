import { Application } from 'egg';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

let count = 0;

export default class appHooks {

  constructor(private app: Application) { }

  //文件加载完成之后，创建数据库链接

  async didLoad() {

    const { app } = this;

    const models = app.loadModel();

    try {

      app.model = await createConnection({
        namingStrategy: new SnakeNamingStrategy(), // 命名策略改成下划线的形式
        entities: models,
        ...(<any>app.config.typeorm)
      });

      const rows = await app.model.manager.query('select 1 as column1;');
      const index = count++;
      app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK, rds currentTime: ${rows[0].currentTime}`);

    } catch (error) {

      app.logger.error(JSON.stringify(error))

    }

  }

};