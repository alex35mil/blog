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
};

export default resolvers;
