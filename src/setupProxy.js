const proxy = require("http-proxy-middleware").createProxyMiddleware;
console.log(proxy);

module.exports = function (app) {
  app.use(proxy("/api", { target: `http://localhost:22306/` }));
};
