import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

// to allow the use of __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/client/App.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    watch: true, // Enable file watching for changes
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                    },
                },
            },
            {
              test: /\.(tsx?)$/,
              exclude: /node_modules/,
              use: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx','.ts','.jsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: './src/client/style.css' }],
        }),
    ],
    devServer: {
        proxy: [
            {
              context: ['/'],
              target: 'http://localhost:8080',
              changeOrigin: true,
              secure: false,
            },
        ],
        port: 5001,
    },
};