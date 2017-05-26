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
      const chunkFiles = chunk.files.reduce((files, file) => {
        // Relying on filename pattern here: `[name].[hash].[ext]`
        // Why:
        //   1. `app` & `vendor` styles are splited via loader settings,
        //      not via CommonsChunkPlugin, b/c this is the easiest way
        //      to load vendor CSS w/o applying CSS Modules to vendor classes.
        //   2. It means `app.css` and `vendor.css` files are inside `app` chunk item.
        //      And `vendor` chunk holds only js file, extracted by CommonsChunkPlugin.
        //
        //   😵 🔫
        const [name, hash, ext] = file.split('.'); // eslint-disable-line no-unused-vars
        return { ...files, [`${name}.${ext}`]: file };
      }, {});
      return { ...dict, ...chunkFiles };
    }, {});

    const outputPath = path.join(this.path, this.filename);
    const outputData = isDevelopment ? JSON.stringify(output, null, 2) : JSON.stringify(output);

    fsx.ensureDirSync(this.path);
    fsx.writeFileSync(outputPath, outputData);
  });
};

export default AssetsManifestPlugin;
