/*
 * @Author: yjl
 * @Date: 2024-07-09 17:01:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:43:50
 * @Description: 描述
 */
"use strict";

exports.Object = {};

exports.Token = {
  token: {
    type: "string",
    required: true,
    description: "返回token后续所有的接口都带到请求头里面",
  },
};
