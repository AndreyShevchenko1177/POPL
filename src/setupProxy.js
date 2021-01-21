const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://poplme.co",
      pathRewrite: { "^/api": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    })
  );
};

// import { createProxyMiddleware } from 'http-proxy-middleware';

// const options = {
//   target: 'https://poplme.co/',
//   pathRewrite: {
//     '^/api/': '/', // remove base path
//   },
// };

// const apiProxy = createProxyMiddleware('/api', options);
