/* @flow */
/* eslint-disable no-useless-escape */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, B, I, Ul, Ol, Li, Snippet } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const IsomorphicReactWithRailsPartI = (props: $PostProps) => (
  <Post {...props}>
    <P>
      One of the greatest features in React is a declarative way to construct
      the things. Once you’ve tried it—you’ll never go back to imperative mess.
      A few days ago, while rewriting some webpack configs, I finally figured
      out what’s so annoying in the way we usually cook them: we cook them in
      imperative way.
    </P>
    <P>
      Both of the approaches I’ll be talking about in this post are trade offs.
      And I can’t assert that one is unconditionally better than the other, both
      have its pros and cons. But you can compare and choose which one works
      better for you.
    </P>
    <P>
      Let’s create 2 simple webpack configs in two different ways (I assume
      you’re already familiar with webpack):
    </P>
    <Ol>
      <Li>
        <B>Development config</B> for client build.
      </Li>
      <Li>
        <B>Production config</B> for client build.
      </Li>
    </Ol>
    <P>
      <B>Both</B> configs should have:
    </P>
    <Ul>
      <Li>
        Separated <I>app</I> & <I>vendor</I> bundles
      </Li>
      <Li>
        <I>ES Next</I> loader
      </Li>
      <Li>
        <I>SCSS</I> loader
      </Li>
    </Ul>

    <P>
      <B>Development</B> config should have:
    </P>
    <Ul>
      <Li>Hot reloading</Li>
    </Ul>

    <P>
      <B>Production</B> config should have:
    </P>
    <Ul>
      <Li>Cache busting</Li>
      <Li>JS minification</Li>
      <Li>Extracted CSS file with styles</Li>
    </Ul>
    <P>
      It’s really simple case and in real life there will be more stuff. But
      even now these configs are quite different. First, let’s take a look at
      final configs and figure out how we can DRY them out.
    </P>

    <Snippet lang="js" file="webpack.dev.config.js">
      {`
        import webpack from 'webpack';
        import path from 'path';

        export default {
          entry: {
            app: [
              'webpack-dev-server/client?http://localhost:4000',
              'webpack/hot/dev-server',
              './path/to/app',                                        // <--- shared
            ],
            vendor: ['react', 'react-dom'],                           // <--- shared
          },

          output: {
            path: path.resolve(process.cwd(), 'public', 'assets'),    // <--- shared
            filename: '[name].js',
            publicPath: 'http://lvh.me:4000/assets',
          },

          resolve: { extensions: ['', '.js', '.jsx'] },               // <--- shared
          devtool: '#cheap-module-eval-source-map',

          plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({                 // <--- almost shared
              name: 'vendor',
              chunks: ['app'],
              filename: 'vendor.js',
              minChunks: Infinity,
            }),
          ],

          module: {
            loaders: [
              { test: /\.jsx?$/, loader: 'babel' },                   // <--- shared
              { test: /\.css$/, loaders: ['style', 'css'] },
              { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            ],
          },
        }
      `}
    </Snippet>

    <Snippet lang="js" file="webpack.prod.config.js">
      {`
        import webpack from 'webpack';
        import ExtractText from 'extract-text-webpack-plugin';
        import path from 'path';

        export default {
          entry: {
            app: ['./path/to/app' ],                             // <--- shared
            vendor: ['react', 'react-dom'],                      // <--- shared
          },

          output: {
            path: path.join(process.cwd(), 'public', 'assets'),  // <--- shared
            filename: '[name]-[chunkhash].js',
            chunkFilename: '[name]-[chunkhash].js',
          },

          resolve: { extensions: ['', '.js', '.jsx'] },          // <--- shared
          devtool: false,

          plugins: [
            new ExtractText('[name]-[chunkhash].css', { allChunks: true }),
            new webpack.optimize.CommonsChunkPlugin({            // <--- almost shared
              name: 'vendor',
              chunks: ['app'],
              filename: 'vendor-[chunkhash].js',
              minChunks: Infinity,
            }),
            new webpack.optimize.UglifyJsPlugin(),
          ],

          module: {
            loaders: [
              { test: /\.jsx?$/, loader: 'babel' },               // <--- shared
              { test: /\.css$/, loader: ExtractText.extract('style', 'css') },
              { test: /\.scss$/, loader: ExtractText.extract('style', 'css!sass') },
            ],
          },
        }
      `}
    </Snippet>

    <H2>Imperative way</H2>
    <P>
      Let’s create <B>webpack.base.config.js</B> and inherit base stuff from it.
    </P>

    <Snippet lang="js" file="webpack.base.config.js">
      {`
        import path from 'path';

        export default {
          entry: {
            app: ['./path/to/app'],
            vendor: ['react', 'react-dom'],
          },

          output: {
            path: path.join(process.cwd(), 'public', 'assets'),
          },

          resolve: {
            extensions: ['', '.js', '.jsx'],
          },

          plugins: [],

          module: {
            loaders: [
              { test: /\.jsx?$/, loader: 'babel' },
            ],
          },
        }
      `}
    </Snippet>

    <P>
      Now we have all shared things in base config file. Let’s start inherit!
    </P>

    <Snippet lang="js" file="webpack.dev.config.js">
      {`
        import webpack from 'webpack';
        import path from 'path';

        import config from './webpack.base.config.js';

        config.entry.app.unshift(
          'webpack-dev-server/client?http://localhost:4000',
          'webpack/hot/dev-server',
        );

        config.output.filename = '[name].js';
        config.output.publicPath = 'http://lvh.me:4000/assets';
        config.devtool = '#cheap-module-eval-source-map';

        config.plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: [ 'app' ],
            filename: 'vendor.js',
            minChunks: Infinity,
          }),
        );

        config.module.loaders.push(
          { test: /\.css$/, loaders: ['style', 'css'] },
          { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
        );

        export default config;
      `}
    </Snippet>

    <Snippet lang="js" file="webpack.prod.config.js">
      {`
        import webpack from 'webpack';
        import ExtractText from 'extract-text-webpack-plugin';
        import path from 'path';

        import config from './webpack.base.config.js';

        config.output.filename = '[name]-[chunkhash].js';
        config.output.chunkFilename = '[name]-[chunkhash].js';
        config.devtool = false;

        config.plugins.push(
          new ExtractText('[name]-[chunkhash].css', { allChunks: true }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: [ 'app' ],
            filename: 'vendor-[chunkhash].js',
            minChunks: Infinity,
          }),
          new webpack.optimize.UglifyJsPlugin(),
        );

        config.module.loaders.push(
          { test: /\.css$/, loader: ExtractText.extract('style', 'css') },
          { test: /\.scss$/, loader: ExtractText.extract('style', 'css!sass') },
        );

        export default config;
      `}
    </Snippet>

    <P>
      The main downside of this approach is that I can’t easily figure out
      what’s going on inside each config. I have to construct its shape in my
      mind after analyzing base and child configs. In case of complex setup it’s
      really annoying. So let’s take a look at another approach, which I like
      better.
    </P>

    <H2>Declarative way</H2>
    <P>
      Instead of creating base config, we can place common parts to stand-alone{' '}
      <B>config.js</B> and (re)use them by cherry-picking in another configs
      (whose shape will be preserved).
    </P>

    <Snippet lang="js" file="config.js">
      {`
        export const entryPoint = './path/to/app';
        export const vendorModules = ['react', 'react-dom'];
        export const outputPath = path.join(process.cwd(), 'public', 'assets');

        export const resolveParams = { extensions: ['', '.js', '.jsx'] };

        export const jsLoaderTest = /\.jsx?$/;
        export const cssLoaderTest = /\.css$/;
        export const scssLoaderTest = /\.scss$/;

        export const getCommonsChunkPluginParams = filename => ({
          filename,
          name: 'vendor',
          chunks: ['app'],
          minChunks: Infinity,
        });
      `}
    </Snippet>

    <Snippet lang="js" file="webpack.dev.config.js">
      {`
        import webpack from 'webpack';

        import * as config from './config.js';

        export default {
          entry: {
            app: [
              'webpack-dev-server/client?http://localhost:4000',
              'webpack/hot/dev-server',
              config.entryPoint,
            ],
            vendor: config.vendorModules,
          },

          output: {
            path: config.outputPath,
            filename: '[name].js',
            publicPath: 'http://lvh.me:4000/assets',
          },

          resolve: config.resolveParams,
          devtool: '#cheap-module-eval-source-map',

          plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin(
              config.getCommonsChunkPluginParams('vendor.js')
            ),
          ],

          module: {
            loaders: [
              { test: config.jsLoaderTest, loader: 'babel' },
              { test: config.cssLoaderTest, loaders: ['style', 'css'] },
              { test: config.scssLoaderTest, loaders: ['style', 'css', 'sass'] },
            ],
          },
        }
      `}
    </Snippet>

    <Snippet lang="js" file="webpack.prod.config.js">
      {`
        import webpack from 'webpack';
        import ExtractText from 'extract-text-webpack-plugin';

        import * as config from './config.js';

        export default {
          entry: {
            app: config.entryPoint
            vendor: config.vendorModules
          },

          output: {
            path: config.outputPath,
            filename: '[name]-[chunkhash].js',
            chunkFilename: '[name]-[chunkhash].js',
          },

          resolve: config.resolveParams,
          devtool: false,

          plugins: [
            new ExtractText('[name]-[chunkhash].css', { allChunks: true }),
            new webpack.optimize.CommonsChunkPlugin(
              config.getCommonsChunkPluginParams('vendor-[chunkhash].js')
            ),
            new webpack.optimize.UglifyJsPlugin(),
          ],

          module: {
            loaders: [
              { test: config.jsLoaderTest, loader: 'babel' },
              { test: config.cssLoaderTest, loader: ExtractText.extract('style', 'css') },
              { test: config.scssLoaderTest, loader: ExtractText.extract('style', 'css!sass') },
            ],
          },
        }
      `}
    </Snippet>

    <P>
      Thus we can’t see real values under the imported props, but now each
      config looks more structured and readable (at my taste of course). So try
      this out and pick your way of writing webpack configs!
    </P>
  </Post>
);

export default withPostMeta(IsomorphicReactWithRailsPartI, {
  type: 'article',
  description: 'Building webpack configs in declarative way.',
});
