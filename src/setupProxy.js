const { createProxyMiddleware } = require("http-proxy-middleware");
console.log("Problem with Proxy");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: `http://localhost:22306/`,
      changeOrigin: true,
    })
  );
};
