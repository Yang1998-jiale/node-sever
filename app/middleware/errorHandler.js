/*
 * @Author: yjl
 * @Date: 2024-07-11 17:25:37
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-12 11:11:43
 * @Description: 描述
 */
const HTTPException = require("../exception/http");

// const NotFoundException = require("../exception/not_found");
module.exports = () => {
  return async function errorHandler(ctx, next) {
    const method = ctx.request.method;
    if (method === "OPTIONS") {
      ctx.status = 204;
      return;
    }
    try {
      await next();
    } catch (err) {
      console.log(err.message);
      if (err instanceof HTTPException) {
        ctx.status = err.httpCode;
        ctx.body = {
          code: err.code,
          message: err.message,
          data: err.data,
        };
        return
      }

      ctx.status = 500;
      ctx.body = {
        code: 8,
        message: err.message || "服务器错误",
        data: null,
      };
    }
  };
};
