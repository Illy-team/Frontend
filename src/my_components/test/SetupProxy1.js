/*
const ServerURL = 'http://15.164.143.17:8080';
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: ServerURL,
      changeOrigin: true,
    })
  );
  app.use(
    "/",
    createProxyMiddleware({
      target: ServerURL,
      changeOrigin: true,
    })
  );
  app.use(
    "",
    createProxyMiddleware({
      target: ServerURL,
      changeOrigin: true,
    })
  );
};
*/