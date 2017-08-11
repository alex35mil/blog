/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import {
  Post,
  H2,
  P,
  A,
  C,
  Ul,
  Ol,
  Li,
  Image,
  Snippet,
  Expandable,
  Divider,
  Highlight,
} from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import topDownImage from './images/01-top-down.png?preset=inline';
import sideImage from './images/02-side.png?preset=inline';

const YearOfDevelopmentWithReduxPartI = (props: $PostProps) =>
  <Post {...props}>
    <P>
      I’ve spent the past year working on the primary product of{' '}
      <A href="http://www.shakacode.com" targetBlank>
        ShakaCode
      </A>{' '}
      and I’d like to share three biggest insights that I gained during this
      journey.
    </P>

    <H2>The App</H2>
    <P>
      We’ve been working on a service called{' '}
      <A href="https://www.friendsandguests.com" targetBlank>
        Friends & Guests
      </A>. It is a vacation rental listing site which puts the relationships
      between hosts and guests first. It’s like Airbnb or VRBO, with social
      connections for referrals, guest discovery, and optional privacy.
    </P>
    <P>
      The app is backed by Rails with{' '}
      <A href="https://github.com/shakacode/react_on_rails" targetBlank>
        <C>react_on_rails</C>
      </A>{' '}
      gem and UIs are built with React & Redux. We’re not fully a SPA yet, but
      each big section of the site is JS app and acts like mini-SPA.
    </P>
    <P>On the frontend we’re using:</P>
    <Ul>
      <Li>
        <A href="https://facebook.github.io/react" targetBlank>
          React
        </A>
      </Li>
      <Li>
        <A href="http://redux.js.org" targetBlank>
          Redux
        </A>
      </Li>
      <Li>
        <A href="https://facebook.github.io/immutable-js" targetBlank>
          Immutable
        </A>
      </Li>
      <Li>
        <A href="https://github.com/reactjs/reselect" targetBlank>
          Reselect
        </A>
      </Li>
      <Li>
        <A href="https://github.com/paularmstrong/normalizr" targetBlank>
          normalizr
        </A>
      </Li>
    </Ul>
    <P>and bunch of other great libs, non-related to this post.</P>
    <P>
      The section I’ve been mainly working on is the listings management
      interface, where the host can create a listing, edit it, manage privacy
      settings, photos and do other listings related things. This part of the
      JavaScript app consists of 3 sections:
    </P>
    <Ul>
      <Li>
        <A href="https://cl.ly/iZba/Wizard.jpg" targetBlank>
          Wizard
        </A>
      </Li>
      <Li>
        <A href="https://cl.ly/iZMq/Listing.jpg" targetBlank>
          Listing Edit Screen
        </A>
      </Li>
      <Li>
        <A href="https://cl.ly/iYpq/Listings.jpg" targetBlank>
          Listings Index
        </A>
      </Li>
    </Ul>
    <P>
      In our app, we try to persist the state on the server as much as we can.
      For example, when the host started the wizard or edited listing’s draft
      and left the site for a while — state is stored on the server, and he can
      get back to the same state anytime he likes. Edit Screen works similar to
      Medium’s posts: each listing has a draft record, which the host can edit
      and it won’t go live until host published it.
    </P>

    <H2>Insight #1</H2>
    <P>
      In a vanilla React app when 2 UI components are located in different parts
      of UI and need same data, the only way to provide the data for both is to
      store it in stateful component on top of the render tree and pass it down
      via <C>props</C>.
    </P>
    <P>
      Similar pattern was used to implement Listings UI, but using Redux. We had
      a number of stores like <C>listingsStore</C>, <C>photosStore</C> etc. (To
      clarify: we have one redux store, but we call slices of the state, that
      are being transformed by reducers, each a store). Every store contained
      entities, form state for each entity, statuses (e.g. <C>isProcessing</C>)
      etc. From the store, data is combined via selectors and passed down to
      components — right from the top of the render tree. Like this:
    </P>

    <Image
      src={topDownImage}
      placement="bleed"
      alt="Passing props from the top"
    />

    <P>
      Oh my, that was a bad idea! The render tree was nailed by data props and
      action creators. Every keystroke in the form field was causing re-render
      of the whole tree. In addition to that, there were debounced updates to
      persist input data on the server. The waterfalls of props and re-rendering
      resulted in a huge performance issue.
    </P>
    <P>
      To solve this we reconsidered the vanilla React pattern and used features
      of Redux. Instead of connecting view layer to the state at the top of the
      UI render tree, we removed top level containers and connected each
      interactive element (e.g. text input, publish button) or element, that
      needs data, to Redux state on its own. Thus most of the containers
      appeared at the tips of the render tree. Like this:
    </P>

    <Image src={sideImage} placement="fill" alt="Passing props at the tips" />

    <P>We split our stores on 2 types:</P>
    <Ul>
      <Li>Data stores</Li>
      <Li>View layer stores</Li>
    </Ul>

    <P>
      Data stores don’t know anything about UI. They hold only persisted data,
      and they provide the data to many connected view layer components via
      their selectors. Basically, it’s our database on the client.
    </P>
    <P>Usually, it’s shaped like this:</P>
    <Snippet lang="js">
      {`
        const dataStore = Map({
          index: Set([1, 2, 3]), // Set or OrderedSet of ids
          entities: Map({
            1: Map({ id: 1, … }),
            2: Map({ id: 2, … }),
            3: Map({ id: 3, … }),
          }),
        });
      `}
    </Snippet>

    <Expandable label="Tip: Normalize your ids">
      <P>
        If you use Immutable, normalizr and integer server ids, then make the
        type of these ids consistent across the client side app to deal only
        with numeric values.
      </P>
      <Ol>
        <Li>
          In selectors, convert stringified id (from url params) to int. Thus,
          the view layer will receive numeric values.
        </Li>
        <Li>
          Create a wrapper for the normalize() method, which converts
          stringified keys of immutable Map to ints. Thus, you can safely use{' '}
          <C>{`state.getIn(['entities', entityId])`}</C> where entityId is an
          int.
        </Li>
      </Ol>
    </Expandable>

    <P>
      For each interactive element in the UI we created its own reducer,
      selectors and / or set of action creators. And finally, this element was
      placed in its own container, where it connects to Redux store.
    </P>
    <P>
      With this change each form field keystroke will cause a re-render to only
      a tiny bit of the UI. At the same time, we are able to share the state of
      the form with others interested in these updates parts of UI. We just need
      to connect those container components to the store and fetch the required
      data via selectors.
    </P>

    <Highlight>
      Keep connected parts small to avoid pernicious coupling
    </Highlight>

    <P>
      Rule of Thumb: if the distance between the point where prop is being
      passed and where it’s actually being used is more than 2 components deep,
      then consider changing the setup of containers and dumb components.
    </P>
    <P>
      This pattern makes UI code highly maintainable as each connected part is
      small and exists in isolation: it can be easily changed, moved or deleted
      with very low risks to break anything.
    </P>

    <Expandable label="Tip: Scope stores">
      <P>
        Use{' '}
        <A href="http://redux.js.org/docs/api/combineReducers.html" targetBlank>
          <C>combineReducers</C>
        </A>{' '}
        to scope your stores and keep your state (& Redux DevTools) organized.
        Keep the one data scope and one UX scope per app section:
      </P>
      <Snippet>
        {`
          state:
           data:
             listingsStore
             photosStore
             …
           listingsIndex:
             thumbnailStore
             publishButtonStore
             …
           listingEdit:
             titleFormStore
             descriptionFormStore
             …
        `}
      </Snippet>
    </Expandable>

    <Divider />

    <P>
      This change greatly improved a performance of the app but introduced some
      new issues, which are the subject of Part II.
    </P>
    <P>Stay tuned!</P>
  </Post>;

export default withPostMeta(YearOfDevelopmentWithReduxPartI, {
  type: 'article',
  description: 'Improving performance of Redux apps via reducers composition.',
});
