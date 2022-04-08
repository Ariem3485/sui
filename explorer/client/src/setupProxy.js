const { createProxyMiddleware } = require('http-proxy-middleware');

const apiUrl = process.env.API_SERVER || 'http://localhost:5001';

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: apiUrl,
            changeOrigin: true,
            pathRewrite: {
                '^/api/': '/',
            },
        })
    );
};