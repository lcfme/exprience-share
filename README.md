# 技术分享

## 小团子后台项目用到的技术
项目采用webpack打包
遇到的主要问题
### 1） 跨域及认证问题
后端的认证是继续cookie的auth。如果设置access-control-allow-origin: *，在options（preflight请求）中就会被禁止。
解决方案 在dev-server中设置代理服务 dev-server的源码是用了express开启了一个服务器，其中用到了一个http-proxy-middleware的中间件
![picture](./assets/dev-server-proxy-config.png)
```javascript
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
```javascript
(function (jQuery) {
  var $ = jQuery;
  // bootstrap code here.
})(jQuery);
```
如果在webpack项目中，入口main.js直接以
```
import 'bootstrap/dist/bootstrap.js';
```
运行时会报出异常，因为全局没有jQuery。
这是有两种解决方案，
一种是在index.html中直接引jQuery.js和bootstrap.js，然后在webpack配置中配置external代表不需要webpack管理的全局变量，
```javascript
externals: {
  jquery: 'jQuery.noConflict()' //或者jquery:'jQuery'
},

const jQuery = require('jquery');
```
copy-webpack-plugin在编译时会将项目根目录下的static文件中将jQuery、Bootstrap拷贝到dist文件下的assets中，实现静态资源。但是这种方法有弊端，bootstrap和jQuery没有被npm做版本管理。
第二种方案是用 expose-loader 全局引入 jquery
代码见 expose-loader-demo
