const { createProxyMiddleware } = require("http-proxy-middleware");//redireccionamiento
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google","/uploads"],//si alguien accede aqui mandalo a http://localhost:5000/auth/...
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
