import webpack from 'webpack';

module.exports = {
  entry: [
    './src/QingStorAuthorizationSignatureDynamicValue.js',
  ],
  output:{
    path: './build/com.prettyxw.paw.extensions.QingStorAuthorizationSignatureDynamicValue',
    pathInfo: true,
    publicPath: '/build/',
    filename: 'QingStorAuthorizationSignatureDynamicValue.js',
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
