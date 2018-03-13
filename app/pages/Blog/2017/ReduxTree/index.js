/* @flow */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import {
  Post,
  H2,
  P,
  B,
  I,
  A,
  C,
  Ul,
  Li,
  Note,
  Highlight,
  Snippet,
} from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import coverImage from './images/cover.jpg?preset=cover';

const ReduxTree = (props: $PostProps) => (
  <Post
    {...props}
    cover={coverImage}
    credit={{ author: 'veeterzy.com', url: 'http://veeterzy.com' }}
  >
    <P>
      There are two ways of thinking of about UI: in terms of <B>state</B> or in
      terms of <B>interactions</B>.
    </P>

    <H2>State-based model</H2>
    <P>
      This pattern is common in the Redux community. In this style of thinking,
      the building blocks of the app are reducers. Each reducer is tightly
      coupled to a specific part of the state. It decides how to respond to
      actions from the outside. It has full control over its part of the state,
      and that’s its only concern.
    </P>
    <P>
      The main take away here is that <B>state is a smart essence</B>.
    </P>

    <H2>Interactions-based model</H2>
    <P>
      In this model, application state is represented as an <B>inert tree</B>.
    </P>
    <Snippet>
      {`
        state:
          entities:
            posts: { index, entities }
            comments: { entities }
          ui:
            postsList: { processingPosts }
            ...
      `}
    </Snippet>
    <Note>
      The state tree is a combination of <C>branches</C> and <C>leaves</C>. A
      branch doesn’t hold any state itself but is a grouping of leaves that each
      hold chunks of the application state. For example, the branch{' '}
      <C>state.entities</C> groups the states of the <C>posts</C> leaf,{' '}
      <C>comments</C> leaf, etc.
    </Note>

    <P>
      When a user interacts with the UI, the application changes its state in
      response. As opposed to a reducers-based model, state is a passive data
      container here. And interactions are the ones in charge.
    </P>
    <P>
      Let’s say a user manages his posts and removes one of them by clicking the
      “Delete” button. What’s happening under the hood? The state of this UI
      part is stored in the <C>state.ui.postsList</C> leaf. Clicking on the
      button, a user triggers an action creator and the app starts a request to
      the server. In response to this action, <C>postId</C> is added to the{' '}
      <C>processingPosts</C> set to show the spinner in the UI. It requires a
      change of the single ui.postsList leaf. Let’s describe it in the
      interaction module:
    </P>
    <Snippet lang="js">
      {`
        // Action creator: returns request action
        const requestAction = postId => ({
          type: 'POST_DELETE_REQUESTED',
          postId,
        });

        // Action handler: reduces the state of the single leaf
        const onRequest = {
          POST_DELETE_REQUESTED:
            (state, { postId }) =>
              state.update('processingPosts', processingPosts => processingPosts.add(postId)),
        };
      `}
    </Snippet>

    <P>When a server responds with a success:</P>
    <Ul>
      <Li>
        <C>postId</C> must be removed from the <C>processingPosts</C>
      </Li>
      <Li>
        post entity must be removed from the <C>entities.posts</C> leaf
      </Li>
    </Ul>
    <P>This action entails changing 2 different leaves:</P>
    <Snippet lang="js">
      {`
        // Action creator: returns success action
        const successAction = postId => ({
          type: 'POST_DELETE_SUCCEEDED',
          postId,
        });

        // Action handlers: passing array of the reducers for this action type
        //                  to apply sequence of the changes to the state tree
        const onSuccess = {
          POST_DELETE_SUCCEEDED: [
            // 1. hide spinner
            (state, { postId }) =>
              state.update('processingPosts', processingPosts => processingPosts.delete(postId)),

            // 2. remove post entity
            {
              leaf: ['entities', 'posts'], // <= keypath to the leaf of the state
              reduce:
                (postsEntitiesState, { postId }) =>
                  postsEntitiesState
                    .updateIn(['index'], index => index.delete(postId))
                    .updateIn(['entities'], entities => entities.delete(postId)),
            },
          ],
        };
      `}
    </Snippet>
    <P>
      Notice how easy it is to follow what’s going on here because the logic of
      a single interaction is contained entirely in a single module. Try it and
      you will see how easy it is writing{' '}
      <A
        href="https://github.com/shakacode/redux-tree/blob/master/example/src/app/ui/PostsList/interactions/postDelete.js"
        targetBlank
      >
        code like this
      </A>.
    </P>
    <P>
      The key point is that an interaction decides which part(s) of the state
      will be updated in response to the action.
    </P>

    <H2>Introducing redux-tree</H2>
    <Highlight>
      <A href="https://github.com/shakacode/redux-tree" targetBlank>
        github.com/shakacode/redux-tree
      </A>
    </Highlight>

    <P>
      Under the hood, <C>redux-tree</C> is an alternative version of Redux’s{' '}
      <C>combineReducers</C>, which makes it possible to represent changes to
      the state as a sequence of functions. This allows describing interactions
      in a very concise and consistent manner.
    </P>
    <P>
      It’s super easy to integrate <C>redux-tree</C> into existing codebases as
      it supports classic reducers (so incremental adoption is absolutely
      possible) and it should be compatible with the most of the packages from
      Redux ecosystem. The main change it introduces is how Redux{' '}
      <I>internally</I> iterates over the reducers.
    </P>
    <P>
      In the initial release of <C>redux-tree</C>, state is represented as an
      Immutable Record. We use Immutable a lot in our apps: it makes it easier
      to handle deep updates and prevent state mutations, Record allows access
      to properties using dot notation (as opposed to getters), and it’s
      possible to strongly type the state tree with Flow. So,{' '}
      <A href="http://facebook.github.io/immutable-js/" targetBlank>
        <C>immutable-js</C>
      </A>{' '}
      is required (at least for now).
    </P>
    <P>Check out:</P>
    <Ul>
      <Li>
        <A href="https://github.com/shakacode/redux-interactions" targetBlank>
          redux-interactions
        </A>
      </Li>
      <Li>
        <A href="https://github.com/shakacode/redux-tree" targetBlank>
          redux-tree
        </A>
      </Li>
    </Ul>
    <P>And let me know how it works for you!</P>
  </Post>
);

export default withPostMeta(ReduxTree, {
  type: 'article',
  image: coverImage.fallback,
  description:
    'There are two ways of thinking of about UI: in terms of state or in terms of interactions.',
});
