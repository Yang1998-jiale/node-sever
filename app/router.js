/*
 * @Author: yjl
 * @Date: 2024-07-09 09:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-09 17:51:00
 * @Description: 描述
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.redirect("/", "/swagger-ui.html", 302);
  router.post("/user/register", controller.user.register);
  router.post("/user/login", controller.user.login);
  router.get("/user/getUserInfo", controller.user.getUserInfo);
};
