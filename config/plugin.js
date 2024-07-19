/*
 * @Author: yjl
 * @Date: 2024-07-09 09:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-19 10:20:24
 * @Description: 描述
 */
/** @type Egg.EggPlugin */

const path = require("path");
module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  swaggerdoc: {
    enable: true, // 是否启用。
    package: "egg-swagger-doc", // 指定包名称。
  },
};
