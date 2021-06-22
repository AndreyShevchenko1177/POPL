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
    "/firebase",
    createProxyMiddleware({
      target: "https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/",
      pathRewrite: { "^/firebase": "/" },
      headers: { "X-Forwarded-Prefix": "/" },
      changeOrigin: true,
    }),
  );
};
