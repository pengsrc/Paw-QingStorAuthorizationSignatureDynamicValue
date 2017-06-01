import webpack from 'webpack';

const name = 'QingStorAuthorizationSignatureDynamicValue';

module.exports = {
  entry: [`./src/${name}.js`],
  output:{
    path: `./build/io.pjw.paw.extensions.${name}`,
    pathInfo: true,
    publicPath: '/build/',
    filename: `${name}.js`,
  },
  module: {
    loaders: [
      {
        test:    /^.*.js$/,
        exclude: /node_modules/,
        loaders: [`babel?${JSON.stringify({presets: ['es2015']})}`],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
    }),
  ],
};
