/*
 * @Author: yjl
 * @Date: 2024-07-11 17:20:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-11 17:57:08
 * @Description: 描述
 */
const HTTPException = require("./http");
class NotFoundException extends HTTPException {
  constructor(message = "资源不存在", errCode = 404) {
    super(errCode, message, null, 404);
  }
}

module.exports = NotFoundException;
