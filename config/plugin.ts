import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  redis: {
    enable: true,
    package:'egg-redis',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
    env: [ 'prod' ],
  },
  eggpig: {
    enable: true,
    package: 'egg-pig',
  },
};

export default plugin;
