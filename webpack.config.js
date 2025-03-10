import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Dotenv from 'dotenv-webpack';
import dotenv from 'dotenv';
dotenv.config()

// to allow the use of __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './packages/dashboard/src/client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // watch: true, // Enable file watching for changes
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      // for module.css files
      {
        test: /\.module\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
      // for global .css files
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // for images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
    new Dotenv(), // This will load your .env file into Webpack
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL || 'http://localhost:4000/graphql'),
    }),
    // new CopyPlugin({
    //   patterns: [{ from: './src/client/components/Home.css' }],
    // }),
    new MiniCssExtractPlugin({
        filename: '[name].css', // Output CSS file names
        chunkFilename: '[id].css',
      }),
  ],
  devServer: {
    // static: {
    //     directory: path.join(__dirname, 'public'), // Ensure this points to the root-level `public/`
    //   },
    // historyApiFallback: true,
    // proxy: [
    //     {
    //       context: ['/'],
    //       target: 'http://localhost:8080',
    //       changeOrigin: true,
    //       secure: false,
    //     },
    // ],
    port: 8081,
  },
};
