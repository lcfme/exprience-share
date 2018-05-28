const aJsonParser = require('a-json-parser');

var json = aJsonParser(`
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
/* -no-zuo-no-die */
`);

debugger;

