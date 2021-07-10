const proxy = require("http-proxy-middleware");
console.log("Problem with Proxy");

module.exports = function (app) {
  app.use(proxy("/api", { target: `http://localhost:22306/` }));
};
