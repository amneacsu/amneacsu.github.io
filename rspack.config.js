import { rspack } from '@rspack/core';

export default {
  experiments: {
    css: true,
  },
  output: {
    clean: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
};
