import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';

import webpack from 'webpack';
import config from '../webpack.config.babel';

import ssrRouter from './ssr';

const app = express();
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(`${__dirname}/../public/favicon.ico`));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  const {publicPath} = config.output;
  const hasColor = process.env.NODE_ENV === 'development';
  const options = {publicPath, stats: {colors: hasColor}};
  app.use(require('webpack-dev-middleware')(compiler, options));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/', ssrRouter);
app.disable('x-powered-by');

const server = app.listen(process.env.PORT || 4000, () => {
  const {port} = server.address();
  console.info(`环境 -> ${process.env.NODE_ENV}`);  // eslint-disable-line
  console.info(`地址 -> http://localhost:${port}`); // eslint-disable-line
});
