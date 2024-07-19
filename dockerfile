# 使用官方Node.js长期支持版本镜像
FROM node:lts
 
 # 创建app目录
RUN mkdir -p /home/node-serve
# 设置工作目录
WORKDIR /home/node-serve
 
# 将package.json和package-lock.json复制到工作目录
COPY package*.json /home/node-serve
 
# 安装项目依赖
RUN npm install --production

 
# 复制项目文件到工作目录
COPY . /home/node-serve
 
# 暴露8000端口
EXPOSE 7001
 
# 启动Egg.js应用
CMD npm run dev
