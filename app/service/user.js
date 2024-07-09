/*
 * @Author: yjl
 * @Date: 2024-07-09 11:17:12
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:30:49
 * @Description: 描述
 */
"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get("user_info", { username });
      return result;
    } catch {
      return "error";
    }
  }

  async registerUser(userInfo) {
    const { app } = this;
    try {
      const result = await app.mysql.insert("user_info", userInfo);
      return result;
    } catch {
      return "error";
    }
  }
}
module.exports = UserService;
