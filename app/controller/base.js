/*
 * @Author: yjl
 * @Date: 2024-07-12 11:06:22
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-12 11:14:36
 * @Description: 描述
 */
const controller = require("egg").Controller;
class BaseController extends controller {
  success(code = 0, message = "success", data = null) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code,
      message,
      data,
    };
  }
}

module.exports = BaseController;
