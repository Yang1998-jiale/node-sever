/*
 * @Author: yjl
 * @Date: 2024-07-12 13:28:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-12 14:32:15
 * @Description: 描述
 */

const HTTPException = require("../exception/http");
module.exports = (secret) => {
  return async function auth(ctx, next) {
    const token = ctx.request.header.authorization;
    if (!token) {
      throw new HTTPException(11, "未登录", null, 401);
    }
    try {
      let decode = ctx.app.jwt.verify(token, secret);
      //   console.log(decode);
      ctx.state.userInfo  = decode;
      await next();
    } catch (error) {
      if (error.message === "jwt malformed") {
        throw new HTTPException(11, "token不存在或者已经失效", null, 401);
      }
      throw new HTTPException(8, error.message || "服务器内部错误", null, 500);
    }
  };
};
