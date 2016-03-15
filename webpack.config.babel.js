import webpack from 'webpack';
import qs from 'querystring';
import autoprefixer from 'autoprefixer';

const cssLoaderQuries = qs.stringify({
  modules: true,
  importLoaders: 1,
  localIdentName: '[path]_[local]_[hash:base64:4]',
});

//noinspection JSUnresolvedFunction
export default {
  devtool: '#inline-source-map',
  entry: {
    client: [
      './client/index.jsx',
      'webpack-hot-middleware/client?noInfo=true&reload=true',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux-logger',
      'redbox-react',
      'webpack-hot-middleware/client?noInfo=true&reload=true',
    ],
  },
  output: {
    path: `${__dirname}/public/assets`,
    filename: '[name].js',
    publicPath: '/assets',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: `style!css?${cssLoaderQuries}!postcss`,
        include: [`${__dirname}/common`],
      },
      {
        test: /\.jsx?$/,
        loader: `babel?cacheDirectory`,
        include: [`${__dirname}/client`, `${__dirname}/common`],
      },
    ],
  },
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
