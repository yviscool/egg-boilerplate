import 'module-alias/register';

import { Application } from 'egg';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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

    } catch (error) {

      app.logger.info(JSON.stringify(error))

    }

  }

};