const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const devServer = {
  host: 'localhost',
  port: 3000,
  hot: true,
  historyApiFallback: true,
};

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.join(srcPath, 'main.tsx'),
  target: !isProd ? 'web' : 'browserslist',
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ].filter(Boolean),
  resolve: {
    // теперь при импорте эти расширения файлов можно не указывать
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@components': path.join(srcPath, 'components'),
      '@configs': path.join(srcPath, 'configs'),
      '@styles': path.join(srcPath, 'styles'),
      '@customTypes': path.join(srcPath, 'types'),
      '@utils': path.join(srcPath, 'utils'),
      '@models': path.join(srcPath, 'models'),
      '@pages': path.join(srcPath, 'pages'),
      '@customHooks': path.join(srcPath, 'customHooks'),
      '@store': path.join(srcPath, 'store'),
      '@assets': path.join(srcPath, 'assets'),
    },
  },
  devServer,
};
