import { rspack } from '@rspack/core';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

import pack from './package.json' with { type: "json" };

const packageNames = glob
  .sync(pack.workspaces[0], { cwd: '.', absolute: true })
  .filter((packagePath) => {
    return fs.existsSync(path.join(packagePath, 'src', 'index.html'));
  })
  .map((packagePath) => path.basename(packagePath));

export default {
  entry: packageNames.reduce((acc, packageName) => {
    return {
      ...acc,
      [packageName]: path.resolve('packages', packageName),
    };
  }, {}),
  experiments: {
    css: true,
  },
  output: {
    clean: true,
  },
  plugins: [
    ...packageNames.map((packageName) => {
      return new rspack.HtmlRspackPlugin({
        template: path.join('packages', packageName, 'src', 'index.html'),
        filename: path.join(packageName === 'home' ? '' : packageName, 'index.html'),
        chunks: [packageName],
      });
    }),
  ],
};
