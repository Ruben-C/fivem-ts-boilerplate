const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

const server = {
  entry: './src/server/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new ESLintPlugin({
      extensions: ['ts'],
      exclude: ['node-modules'],
      fix: true,
      failOnError: true,
      emitError: true,
      emitWarning: true,
    })
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(buildPath, 'server')
  },
  target: 'node',
};

const client = {
  entry: './src/client/client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
      exclude: ['node-modules'],
      fix: true,
      failOnError: true,
      emitError: true,
      emitWarning: true,
    })
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'client.js',
    path: path.resolve(buildPath, 'client'),
  },
};

const shared = {
  entry: {},
  module: {
    rules: [{
      test: path.resolve(__dirname, 'fxmanifest.lua'),
      use: 'null-loader'
    }]
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: [
          buildPath
        ]
      },
      watch: {
        include: [
          buildPath
        ]
      }
    }),
    new CopyPlugin({
      patterns: [
        './fxmanifest.lua'
      ]
    })
  ]
};

module.exports = [shared, server, client];
