/*
 * @Author: yjl
 * @Date: 2024-07-09 15:48:54
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:07:20
 * @Description: 描述
 */
"use strict";

module.exports = {
  baseResponse: {
    code: { type: "number", description: "状态码" },
    message: { type: "string", description: "消息" },
    data: { type: "Object", description: "数据" },
  },
};
