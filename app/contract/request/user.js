/*
 * @Author: yjl
 * @Date: 2024-07-09 15:53:22
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:42:03
 * @Description: 描述
 */
"use strict";

module.exports = {
  registerRequest: {
    username: { type: "string", required: true, description: "登录名" },
    password: { type: "string", required: true, description: "登录密码" },
    tel: { type: "string", required: false, description: "手机号" },
    email: { type: "string", required: false, description: "邮箱地址" },
  },
  loginRequest: {
    username: { type: "string", required: true, description: "登录名" },
    password: { type: "string", required: true, description: "登录密码" },
  },
};
