/* @noflow */
/* ^ noflow b/c it yells on webpack's require resolveWeak */

import type { $PostId } from '../types';
import type { $ChunkResolvers } from '../loader';

type $Resolvers = { [year: string]: { [slug: $PostId]: $ChunkResolvers } };

const resolvers: $Resolvers = {
  2018: {
    'reasonml-modules': {
      resolve: () => import('../../pages/Blog/2018/ReasonModules'),
      getWebpackId: () =>
        require.resolveWeak('../../pages/Blog/2018/ReasonModules'),
    },
    'reasonml-eliminating-illegal-state': {
      resolve: () =>
        import('../../pages/Blog/2018/ReasonEliminatingIllegalState'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2018/ReasonEliminatingIllegalState',
        ),
    },
  },
  2017: {
    tableau: {
      resolve: () => import('../../pages/Blog/2017/Tableau'),
      getWebpackId: () => require.resolveWeak('../../pages/Blog/2017/Tableau'),
    },
    'redux-tree': {
      resolve: () => import('../../pages/Blog/2017/ReduxTree'),
      getWebpackId: () =>
        require.resolveWeak('../../pages/Blog/2017/ReduxTree'),
    },
    'enums-using-immutable-records-and-flow': {
      resolve: () =>
        import('../../pages/Blog/2017/EnumsUsingImmutableRecordsAndFlow'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2017/EnumsUsingImmutableRecordsAndFlow',
        ),
    },
    'year-of-development-with-redux-part-iii': {
      resolve: () =>
        import('../../pages/Blog/2017/YearOfDevelopmentWithReduxPartIII'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2017/YearOfDevelopmentWithReduxPartIII',
        ),
    },
    'year-of-development-with-redux-part-ii': {
      resolve: () =>
        import('../../pages/Blog/2017/YearOfDevelopmentWithReduxPartII'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2017/YearOfDevelopmentWithReduxPartII',
        ),
    },
    'year-of-development-with-redux-part-i': {
      resolve: () =>
        import('../../pages/Blog/2017/YearOfDevelopmentWithReduxPartI'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2017/YearOfDevelopmentWithReduxPartI',
        ),
    },
  },

  2016: {
    'number-one-thing-that-kills-your-productivity': {
      resolve: () =>
        import('../../pages/Blog/2016/NumberOneThingThatKillsYourProductivity'),
      getWebpackId: () =>
        require.resolveWeak(
          '../../pages/Blog/2016/NumberOneThingThatKillsYourProductivity',
        ),
    },
    'code-diet': {
      resolve: () => import('../../pages/Blog/2016/CodeDiet'),
      getWebpackId: () => require.resolveWeak('../../pages/Blog/2016/CodeDiet'),
    },
    'yeoman-generator-es6': {
      resolve: () => import('../../pages/Blog/2016/YoES6'),
      getWebpackId: () => require.resolveWeak('../../pages/Blog/2016/YoES6'),
    },
  },

  2015: {
    'webpack-configs-declarative-way': {
      resolve: () => import('../../pages/Blog/2015/WebpackDeclarative'),
      getWebpackId: () =>
        require.resolveWeak('../../pages/Blog/2015/WebpackDeclarative'),
    },
    'isomorphic-react-with-rails': {
      resolve: () => import('../../pages/Blog/2015/IsomorphicReactWithRails'),
      getWebpackId: () =>
        require.resolveWeak('../../pages/Blog/2015/IsomorphicReactWithRails'),
    },
  },
};

export default resolvers;
