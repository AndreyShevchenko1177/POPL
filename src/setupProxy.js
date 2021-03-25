const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/emailAdd",
    createProxyMiddleware({
      target: "https://us-central1-poplco.cloudfunctions.net/profileOn",
      pathRewrite: { "^/emailAdd": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://poplme.co",
      pathRewrite: { "^/api": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
};
