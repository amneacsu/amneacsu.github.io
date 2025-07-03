import { rspack } from '@rspack/core';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: path.join(__dirname, 'src', 'index.ts'),
  experiments: {
    css: true,
  },
  output: {
    clean: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.join('src', 'index.html'),
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        { from: path.join('src', 'images'), to: 'images' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
};
