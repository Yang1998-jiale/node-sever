/*
 * @Author: yjl
 * @Date: 2024-07-09 16:14:37
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:43:59
 * @Description: 描述
 */
"use strict";

module.exports = {
  loginResponse: {
    code: { type: "number", description: "状态码" },
    message: { type: "string", description: "消息" },
    data: { type: "Token", description: "数据" },
  },
};
