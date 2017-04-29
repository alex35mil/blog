/* @flow */

import type { $PostId } from '../types';
import type { $Loader } from '../loader';

type $Posts = { [slug: $PostId]: $Loader };

const posts: $Posts = {
  'test-post': () => import('../../pages/2017/TestPost'),
  'very-test-post': () => import('../../pages/2017/VeryTestPost'),
};

export default posts;
