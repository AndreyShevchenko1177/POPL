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
