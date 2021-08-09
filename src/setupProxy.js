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
    "/make-pro",
    createProxyMiddleware({
      target: "https://us-central1-poplco.cloudfunctions.net/pro",
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
  app.use(
    "/addtocontacts",
    createProxyMiddleware({
      target: "https://poplme.co",
      pathRewrite: { "^/addtocontacts": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
  app.use(
    "/paragon-connections",
    createProxyMiddleware({
      target: "https://api.useparagon.com/projects/d04cc8f3-7368-4dc3-8d12-d96e538dd6b3/sdk/events/trigger",
      pathRewrite: { "^/paragon-connections": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
  app.use(
    "/v0",
    createProxyMiddleware({
      target: "https://firebasestorage.googleapis.com",
      pathRewrite: { "^/v0": "/v0" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
};
