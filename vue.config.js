module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "dm-recipes.cs.bgu.ac.il"
    // host: "127.0.0.1"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
