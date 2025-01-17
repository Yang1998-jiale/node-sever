/*
 * @Author: yjl
 * @Date: 2024-07-09 09:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-19 10:40:20
 * @Description: 描述
 */
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
require("dotenv").config();
module.exports = (appInfo) => {
  // console.log(appInfo.config);
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: ["*"], // 配置白名单
    },
    cors: {
      credentials: true,
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    jwt: {
      secret: "cha12138",
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1720489950541_5436";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  const mysql = {
    client: {
      // host
      host: "124.71.145.91",
      // 端口号
      port: "3306",
      // 用户名
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || "cha",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  const swaggerdoc = {
    dirScanner: "app/controller", // 扫描的目录，默认为app/controller
    apiInfo: {
      title: "阿猹的Node.js API文档", // 文档标题
      description: "使用egg.js+egg-swagger-doc构建的API文档", // 文档描述
      version: "1.0.0", // 文档版本
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {},
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
      // 自定义全局参数，通过globalParameters()设置
      // globalParameters: {
      //   test: {
      //     in: "query",
      //     type: "string",
      //     description: "this is global test",
      //   },
      // },
    },
  };

  // console.log(config);
  return {
    ...config,
    ...userConfig,
    mysql,
    swaggerdoc,
    middleware: ["errorHandler"],
    cluster: {
      listen: {
        port: 7001,
        // hostname: "0.0.0.0",
        hostname: "",
      },
    },
  };
};
