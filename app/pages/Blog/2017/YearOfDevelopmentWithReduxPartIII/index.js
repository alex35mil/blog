/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { routes } from 'app/shell/routes';

import {
  Post,
  H2,
  H3,
  P,
  B,
  I,
  A,
  C,
  Ul,
  Ol,
  Li,
  Note,
  AnimatedGif,
  Snippet,
  Highlight,
  Divider,
  Expandable,
} from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import flowAnimatedGif from './images/flow.gif';

const YearOfDevelopmentWithReduxPartIII = (props: $PostProps) =>
  <Post {...props}>
    <P>
      In the last post of this series, I’ll demonstrate writing UI code as a set
      of <B>interactions</B> and share how this facilitates integrating Redux
      and{' '}
      <A href="https://flow.org" targetBlank>
        Flow
      </A>.
    </P>
    <H2>Interactions</H2>
    <P>
      When I look at UI code, I want two things to be as obvious as possible:
    </P>
    <Ol>
      <Li>
        What interactions are possible here (e.g., <C>A</C>, <C>B</C> & <C>C</C>).
      </Li>
      <Li>
        If interaction <C>A</C> has happened, what changes did it make to the
        application state?
      </Li>
    </Ol>
    <P>
      The clarity of these points is the key to the long and happy development
      of any UI application.
    </P>
    <P>
      When my interactions were split between the <C>actions.js</C> and{' '}
      <C>reducer.js</C> modules, in order to read or write code, I was having to
      constantly switch back and forth between the two. Things were even worse
      if multiple reducers were involved. I realized that I should reorganize
      the code around the interactions, because either implementing a new or
      working on an existing one, I’m always working{' '}
      <B>in the context of interaction</B>, not action creators or reducers.
    </P>
    <P>
      Based on this, I reorganized my folders into{' '}
      <A
        internal
        href={routes.post('2017', 'year-of-development-with-redux-part-ii')}
      >
        UI units
      </A>, like this one:
    </P>
    <Snippet>
      {`
        |- components/                 # representation
          |-- index.jsx
          |-- index.css
        |- interactions/               # modules w/ interactions
          |-- modalToggle.js
          |-- mapZoomLevelUpdate.js
          |-- formStateUpdate.js
          |-- serverStateUpdate.js
        |- selectors/                  # data selectors
          |-- ...
        |- state.js                    # state definition
        |- actions.js                  # list of action creators
        |- reducer.js                  # list of action handlers
        |- index.js                    # container w/ \`connect\`
      `}
    </Snippet>
    <P>
      The main idea here is to represent <B>interactions as a modules</B>.
    </P>

    <H2>Easy case</H2>
    <P>
      The simplest possible case is when a synchronous action is dispatched and
      only one reducer should respond. For example, the interaction module below
      defines a behavior of modal dialog:
    </P>
    <Snippet lang="js" file="interactions/modalToggle.js">
      {`
        const MODAL_SHOW = 'MODAL_SHOW';
        const MODAL_HIDE = 'MODAL_HIDE';

        // --- Show modal

        // Action creator
        export const showModal = () => ({ type: MODAL_SHOW });

        // Action handler
        export const onModalShow = {
          [MODAL_SHOW]: state => state.set('isVisible', true),
        };


        // --- Hide modal

        // Action creator
        export const hideModal = () => ({ type: MODAL_HIDE });

        // Action handler
        export const onModalHide = {
          [MODAL_HIDE]: state => state.set('isVisible', false),
        };
      `}
    </Snippet>

    <P>
      The reducer module no longer contains any logic, it’s just an index of
      interactions:
    </P>
    <Snippet lang="js" file="reducer.js">
      {`
        import state from './state';

        import { onModalShow, onModalHide } from './interactions/modalToggle';
        // ...

        export default createReducer(state, {
          ...onModalShow,
          ...onModalHide,
          ...onMapZoomLevelUpdate,
          ...onFormStateUpdate,
          ...onServerStateUpdate,
        });
      `}
    </Snippet>
    <Note>
      Notice the <C>createReducer</C> helper from{' '}
      <A
        href="http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers"
        targetBlank
      >
        Redux’s recipes
      </A>. It makes it possible to have an exact mapping of a dispatched action
      from an action creator to the action handler in the reducer. It’ll be
      required for accurate flow typings.
    </Note>

    <H2>Advanced case</H2>
    <P>
      Let’s say you requested to <C>PATCH</C> an entity and the server responded
      with <C>200 OK</C>. At this point to respond on the single dispatch, you
      must apply 2 changes to the app state:
    </P>
    <Ol>
      <Li>reset UI unit store (turn off spinner, reset form state, etc.)</Li>
      <Li>update the entity in the data store</Li>
    </Ol>
    <P>
      <B>UPDATE</B>: To handle updates of the multiple stores in response to a
      single action use{' '}
      <A href="https://github.com/shakacode/redux-tree">
        <C>redux-tree</C>
      </A>.
    </P>
    <Divider />
    <P>The main wins here:</P>
    <Ul>
      <Li>
        <B>Changing things is easy</B>
        <br />
        All the changes in the app caused by the interaction are gathered in one
        place that’s easy to find, easy to reason about, and easy to change,
        move or remove. If a modal must be converted to inline element or a
        Google map must be removed: in each case, you’re dealing with{' '}
        <I>files</I> and <I>folders</I> dedicated to a given interaction instead
        of chunks of code scattered around disparate action and reducer modules.
      </Li>
      <Li>
        <B>Better focus</B>
        <br />
        When you’re working on google map interactions, you’re focused only on
        code related to the google map interactions. There aren’t any
        distractions from unrelated code.
      </Li>
    </Ul>
    <P>Check out examples on GitHub with live demos:</P>
    <Highlight>
      <A href="https://github.com/shakacode/redux-interactions" targetBlank>
        github.com/shakacode/redux-interactions
      </A>
    </Highlight>

    <H2>Flow</H2>
    <P>
      One additional benefit here is the ability to accurately type Redux parts
      with Flow. Thanks to{' '}
      <A href="https://atom.io" targetBlank>
        Atom
      </A>, I can view Flow errors in the real-time in my editor. And thanks to{' '}
      <A href="https://nuclide.io" targetBlank>
        Nuclide
      </A>{' '}
      for superior Flow integration.
    </P>
    <P>My goal in combining Redux & Flow was to prevent the following cases:</P>
    <Expandable label="Dispatching an illegal action to reducer">
      <Snippet lang="js">
        {`
          const selectEntity = entityId => ({
            type: ENTITY_SELECT,
            entityId,
          });

          const onEntitySelect = {
            [ENTITY_SELECT]: (state, { id }) => state.set('id', id),
          //                           ^
          //                           oops, \`entityId\` was dispatched
          };
        `}
      </Snippet>
    </Expandable>

    <Expandable label="Setting an illegal property on the state object">
      <Snippet lang="js">
        {`
          // form state has \`id\` property
          const formState = {
            id: null,
          };

          const onEntitySelect = {
            [UPDATE]: (state, { entityId }) => state.set('entityId', entityId),
          //                                              ^
          //                                              oops, state doesn't have \`entityId\`, but has \`id\`
          };
        `}
      </Snippet>
    </Expandable>

    <Expandable label="Reading an illegal property from the state">
      <Snippet lang="js">
        {`
          // state has \`id\` property
          const formState = {
            id: null,
          };

          export const getStore = state => state.formStore;

          export const getId = createSelector(
            getStore,
            store => store.get('entityId'),
          //                    ^
          //                    oops, state doesn't have \`entityId\`, but has \`id\`
          );        `}
      </Snippet>
    </Expandable>

    <P>Here is the example app I’ll refer to during the rest of this post:</P>
    <P>
      <A
        href="https://github.com/shakacode/redux-interactions/tree/master/examples/flow-interactions"
        targetBlank
      >
        redux-interactions/flow
      </A>
    </P>
    <Note>
      This is a dummy app, where you pick the blog post and edit its title. It
      uses thunks to handle asynchronicity and immutable <C>Records</C> as state
      containers. You can check out its{' '}
      <A href="http://redux-flow-interactions.surge.sh" targetBlank>
        live version
      </A>.
    </Note>

    <H3>Building State type</H3>
    <P>
      The whole <C>State</C> type consists of the many small parts:
    </P>
    <Ul>
      <Li>
        <A
          href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/entities/posts/state.js"
          targetBlank
        >
          Entity store types
        </A>{' '}
        (e.g. store that holds loaded posts)
      </Li>
      <Li>
        <A
          href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/ui/state.js"
          targetBlank
        >
          UI unit store types
        </A>{' '}
        (e.g. store that holds state of the form UI)
      </Li>
    </Ul>
    <P>
      Each part is defined in its context, thus all details are encapsulated.
      Each store is defined as an Immutable <C>Record</C>. In the end, all of
      the store types are{' '}
      <A
        href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/tree.js"
        targetBlank
      >
        combined in global State type
      </A>.
    </P>
    <Snippet>
      {`
        state:
          entities:
            - postsStore
            - commentsStore
            - ...
          ui:
            postsSection:
              - dataFetchStore
              - postEditStore
              - ...
      `}
    </Snippet>

    <H3>Typing Redux parts</H3>
    <P>
      When <C>State</C> is defined, we can{' '}
      <A
        href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/types.js"
        targetBlank
      >
        type other Redux parts
      </A>.
    </P>
    <P>
      Instead of defining an <C>Action</C> via a union type as suggested in{' '}
      <A
        href="https://github.com/reactjs/redux/blob/master/examples/todos-flow/src/types/index.js"
        targetBlank
      >
        official example
      </A>:
    </P>
    <Snippet lang="js">
      {`
        type Action =
          | { type: ACTION_TYPE_1, payload: string }
          | { type: ACTION_TYPE_2 };
      `}
    </Snippet>
    <P>
      It’s defined as just <C>$Subtype</C> of string:
    </P>
    <Snippet lang="js">
      {`type Action = { type: $Subtype<string> };`}
    </Snippet>
    <P>
      Yes, it’s less accurate <I>here</I>, but it will be very accurate in the
      interactions, as you will see below.
    </P>

    <H3>Typing interactions and selectors</H3>
    <P>At this point we can implement typings for all redux parts</P>
    <Ul>
      <Li>
        <A
          href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/ui/interactions/postSelect.js"
          targetBlank
        >
          interactions
        </A>
      </Li>
      <Li>
        <A
          href="https://github.com/shakacode/redux-interactions/blob/master/examples/flow-interactions/src/app/ui/selectors/getLeafData.js"
          targetBlank
        >
          selectors
        </A>
      </Li>
    </Ul>
    <P>
      Here’s an example of the Flow warnings in action, when I refactor state
      property name from <C>postId</C> to <C>id</C>:
    </P>
    <AnimatedGif
      src={flowAnimatedGif}
      placement="bleed"
      alt="Refactoring with Flow"
    />

    <H3>Typing action creators in representational components</H3>
    <P>
      Sadly, Flow can’t infer types of action creators defined in interaction
      modules. But it’s possible to import types of JS entities, e.g.:
    </P>
    <Snippet lang="js">
      {`
        import typeof { updateState as UpdateState } from '../interactions/stateUpdate';

        type Props = {|
          updateState: UpdateState,
        |};
      `}
    </Snippet>

    <P>
      There are some more limitations; see the{' '}
      <A
        href="https://github.com/shakacode/redux-interactions/tree/master/examples/flow-interactions"
        targetBlank
      >
        README
      </A>{' '}
      for details.
    </P>

    <Divider />

    <P>Thanks for reading this, more great stuff coming soon. Cheers!</P>
  </Post>;

export default withPostMeta(YearOfDevelopmentWithReduxPartIII, {
  type: 'article',
  description: 'Interactions pattern and integration Redux with Flow.',
});
