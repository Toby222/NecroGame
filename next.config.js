const WithCSS = require("@zeit/next-css");
module.exports = WithCSS({
  target: "serverless",
  reactStrictMode: true,
});
