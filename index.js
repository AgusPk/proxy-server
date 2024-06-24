const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;
const GRAPHQL_API_URL = process.env.GRAPHQL_API_URL;

// Middleware to forward requests to the GraphQL API
app.use(
  '/graphql',
  createProxyMiddleware({
    target: GRAPHQL_API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '', // remove /graphql from the forwarded path
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
