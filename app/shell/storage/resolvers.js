/* @noflow */
/* ^ noflow b/c it yells on webpack's require resolveWeak */

import type { $PostId } from '../types';
import type { $ChunkResolvers } from '../loader';

type $Resolvers = { [slug: $PostId]: $ChunkResolvers };

const resolvers: $Resolvers = {
  'test-post': {
    resolve: () => import('../../pages/Blog/2017/TestPost'),
    getWebpackId: () => require.resolveWeak('../../pages/Blog/2017/TestPost'),
  },
  'very-test-post': {
    resolve: () => import('../../pages/Blog/2017/VeryTestPost'),
    getWebpackId: () => require.resolveWeak('../../pages/Blog/2017/VeryTestPost'),
  },

  // 2016
  'yeoman-generator-es6': {
    resolve: () => import('../../pages/Blog/2016/YoES6'),
    getWebpackId: () => require.resolveWeak('../../pages/Blog/2016/YoES6'),
  },

  // 2015
  'webpack-configs-declarative-way': {
    resolve: () => import('../../pages/Blog/2015/WebpackDeclarative'),
    getWebpackId: () => require.resolveWeak('../../pages/Blog/2015/WebpackDeclarative'),
  },
  'isomorphic-react-with-rails': {
    resolve: () => import('../../pages/Blog/2015/IsomorphicReactWithRails'),
    getWebpackId: () => require.resolveWeak('../../pages/Blog/2015/IsomorphicReactWithRails'),
  },
};

export default resolvers;
