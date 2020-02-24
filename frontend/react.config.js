module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "https://pf-api.cosme.net"
      }
    }
  }
};
