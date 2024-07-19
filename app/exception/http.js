/*
 * @Author: yjl
 * @Date: 2024-07-11 17:18:23
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-12 10:57:32
 * @Description: 描述
 */

/**
 * code
 * 0：操作成功
 * 1：用户名或密码错误
 * 2：用户名已存在
 * 3：用户不存在
 * 8：服务器内部错误
 * 11：token不存在或者已经失效
 * 12：没有权限
 * 13：非法的参数
 * 14：服务未授权或者已过期
 * 18：手机号，验证码正确，但是相应的用户不存在
 * 19：手机号或者验证码错误
 * 24：第三方服务调用失败
 * 25：访问过于频繁
 * 26：文件资源未找到
 * 28：文件格式错误
 */
class HTTPException extends Error {
  constructor(code = 0, message = "服务器异常", data = null, httpCode = 500) {
    super();
    this.code = code;
    this.message = message;
    this.data = data;
    this.httpCode = httpCode;
  }
}

module.exports = HTTPException;
