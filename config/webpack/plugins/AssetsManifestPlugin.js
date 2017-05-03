/* @flow */

import fsx from 'fs-extra';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

type $Options = {|
  path: string,
  filename: string,
|};

function AssetsManifestPlugin(options: $Options) {
  this.path = options.path;
  this.filename = options.filename;
}

AssetsManifestPlugin.prototype.apply = function ApplyAssetsManifestPlugin(compiler) {
  compiler.plugin('done', stats => {
    const output = stats.toJson().chunks.reduce((dict, chunk) => {
      const name = chunk.names[0] || chunk.id;
      const result = {};
      chunk.files.forEach(file => {
        const ext = path.extname(file);
        result[`${name}${ext}`] = file;
      });
      return { ...dict, ...result };
    }, {});

    const outputPath = path.join(this.path, this.filename);
    const outputData = isDevelopment ? JSON.stringify(output, null, 2) : JSON.stringify(output);

    fsx.ensureDirSync(this.path);
    fsx.writeFileSync(outputPath, outputData);
  });
};

export default AssetsManifestPlugin;
