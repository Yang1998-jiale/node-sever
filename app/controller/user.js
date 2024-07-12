/*
 * @Author: yjl
 * @Date: 2024-07-09 10:02:53
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-12 14:37:54
 * @Description: 描述
 */
"use strict";
const HTTPException = require("../exception/http");
const BaseController = require("./base");

/**
 * @Controller 用户接口
 */

class UserController extends BaseController {
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
      throw new HTTPException(13, "用户名或密码不能为空", null, 500);
    }
    const userData = await ctx.service.user.getUserByName(username);

    if (userData === "error") {
      throw new HTTPException(8, "未知错误", null, 500);
    }

    if (userData && userData.id) {
      throw new HTTPException(2, "账户名已被注册，请重新输入", null, 200);
    }
    const result = await ctx.service.user.registerUser(userInfo);
    if (result) {
      this.success(0, "注册成功", null);
    } else {
      throw new HTTPException(8, "注册失败", null, 500);
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
      throw new HTTPException(13, "用户名或密码不能为空", null, 500);
    }
    const userInfo = await ctx.service.user.getUserByName(username);
    console.log(userInfo);
    if (!userInfo) {
      throw new HTTPException(1, "该用户名不存在,请重新输入", null, 200);
    }
    if (password !== userInfo.password) {
      throw new HTTPException(1, "用户名或密码错误", null, 500);
    }
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token 有效期为 24 小时
      },
      app.config.jwt.secret
    );
    this.success(0, "登录成功", { token });
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
    // console.log(ctx.state.userInfo);
    const { id } = ctx.state.userInfo;
    const userInfo = await ctx.service.user.getUserById(id);
    if (userInfo === "error") {
      throw new HTTPException(8, "未知错误", null, 500);
    }
    if(!userInfo){
      throw new HTTPException(1, "该用户不存在", null, 500);
    }
    this.success(0, "success", userInfo);
  }
}

module.exports = UserController;
// * @Request header string *token
