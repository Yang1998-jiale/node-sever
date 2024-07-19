/*
 * @Author: yjl
 * @Date: 2024-07-09 09:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-18 18:16:41
 * @Description: 描述
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth(app.config.jwt.secret);
  router.redirect("/", "/swagger-ui.html", 302);
  router.post("/user/register", controller.user.register);
  router.post("/user/login", controller.user.login);
  router.get("/user/getUserInfo", auth, controller.user.getUserInfo);
};
