/*
 * @Author: yjl
 * @Date: 2024-07-09 10:02:53
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-10 17:13:46
 * @Description: 描述
 */
"use strict";

const Controller = require("egg").Controller;

/**
 * @Controller 用户接口
 */

class UserController extends Controller {
  /**
   * @Summary 用户注册
   * @Description 输入用户名称和密码，注册新用户
   * @Router POST /user/register
   * @Request body registerRequest *body 用户信息
   * @Response 200 baseResponse ok
   */
  async register() {
    const { ctx } = this;
    const userInfo = ctx.request.body;
    const { username, password } = userInfo;

    if (!username || !password) {
      ctx.body = {
        code: 500,
        message: "用户名或密码不能为空",
      };
      return;
    }
    const userData = await ctx.service.user.getUserByName(username);

    if (userData === "error") {
      ctx.body = {
        code: 500,
        message: "未知错误",
        data: null,
      };
      return;
    }

    if (userData && userData.id) {
      ctx.body = {
        code: 500,
        message: "账户名已被注册，请重新输入",
      };
      return;
    }
    const result = await ctx.service.user.registerUser(userInfo);
    if (result) {
      ctx.body = {
        code: 200,
        message: "注册成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: "注册失败",
        data: null,
      };
    }
  }

  /**
   * @Summary 用户登录
   * @Description 输入用户名称和密码，登录用户
   * @Router POST /user/login
   * @Request body loginRequest *body 用户信息
   * @Response 200 loginResponse 返回token后续所有的接口都带到请求头里面
   */
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 500,
        message: "用户名或密码不能为空",
      };
      return;
    }
    const userInfo = await ctx.service.user.getUserByName(username);
    console.log(userInfo);
    if (!userInfo) {
      ctx.body = {
        code: 500,
        message: "该用户名不存在,请重新输入",
      };
      return;
    }
    if (password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: "账号密码错误",
        data: null,
      };
      return;
    }
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token 有效期为 24 小时
      },
      app.config.jwt.secret
    );
    ctx.body = {
      code: 200,
      message: "登录成功",
      data: {
        token,
      },
    };
  }
  /**
   * @Summary 获取用户信息
   * @Description 获取用户信息
   * @Router GET /user/getUserInfo
   * @Response 200 baseResponse ok
   * @Request header string *Authorization
   */

  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization; // 获取header 的token
    if (!token) {
      ctx.body = {
        code: 500,
        msg: "token不存在",
        data: null,
      };
      return;
    }
    try {
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      ctx.body = {
        code: 200,
        msg: "成功",
        data: {
          ...decode,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg:  "非法标记",
        data: null,
      };
    }
  }
}

module.exports = UserController;
// * @Request header string *token
