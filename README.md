# 技术分享

## 小团子后台项目用到的技术
项目采用webpack打包
遇到的主要问题
### 1） 跨域及认证问题
后端的认证是继续cookie的auth。如果设置access-control-allow-origin: *，在options（preflight请求）中就会被禁止。
解决方案 在dev-server中设置代理服务 dev-server的源码是用了express开启了一个服务器，其中用到了一个http-proxy-middleware的中间件
![picture](./assets/dev-server-proxy-config.png)
```
[
  {
    context: '**/*.php',
    changeOrigin: true,
    target: {
      protocol: 'http',
      // host: 'xiaochengxu.chuchujie.com',
      host:'develop.xiaochengxu.chuchujie.com',
      port: 80
    },
    cookieDomainRewrite: {
      '*': 'localhost'
    }
  }
]

```
配置完毕后，npm run dev就可以开始运行项目了（由于config是node部分，不是src下前端热更新的代码，所以需要每一都重新运行npm run dev）
npm run 的脚本可以在 package.json 下的 script字段找到

### 2）项目中引入jQuery、bootstrap
jQuery是支持umd加载的不解释，bootstrap的加载方式异常的古老
它只是用一个函数创造了属于自己的作用域不污染全局变量，但是不支持任何模块加载机制
```
(function (jQuery) {
  // bootstrap code here.
})(jQuery);
```

