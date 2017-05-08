/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { routes } from 'app/shell/routes';

import { Post, H2, P, B, A, Ul, Li, C, Image, Snippet, Divider, Expandable } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import uiUnitImage from './images/01-ui-unit.png';
import formImage from './images/02-form.png';

const YearOfDevelopmentWithReduxPartII = (props: $PostProps) => (
  <Post {...props}>
    <P>
      <A internal href={routes.post('2017', 'year-of-development-with-redux-part-i')}>
        The previous post
      </A>{' '}
      was about the composition of connected components and performance,
      but those changes introduced another kind of issues,
      that was solved by the second insight.
    </P>

    <H2>Insight #2</H2>
    <P>
      My next pain point was related to the way we structure Redux apps.
      If with a few reducers it was just uncomfortable, then with the changes,
      described in the previous post, it became a problem.
    </P>
    <P>
      Usually, a Redux app has following shape:
    </P>
    <Snippet>
      {`
        app/
          |-- actions/
          |-- components/
          |-- constants/
          |-- reducers/
          |-- selectors/
      `}
    </Snippet>
    <P>
      When every interactive element got its own actions, constants (action types),
      reducer, selectors, etc. — these folders became quite bloated.
      To be honest I was pretty tired and frustrated because of this.
      Sometimes I was just forgetting what I’m doing, while searching through
      those folders for some part of the puzzle.
    </P>
    <P>
      I tried to find the rationale for such structuring in the context of frontend apps,
      but it led me only to MVC roots, where controllers and models are decoupled
      from the views. I’m not going to argue with the necessity of decoupling
      of a logic and representation—we surely need this. But we might be wrong about the scope.
      I believe the same issues lead{' '}
      <A href="https://medium.com/@mxstbr" targetBlank>Max Stoiber</A>{' '}
      to solution introduced in{' '}
      <A href="https://github.com/mxstbr/react-boilerplate/" targetBlank>
        react-boilerplate
      </A>.
    </P>
    <P>
      At first glance, this may seem a mishmash comparing to the common pattern,
      but after I used it for awhile, this seems the most convenient way
      to keep big frontend codebase scalable and maintainable.
      Here are my thoughts on why it is good.
    </P>
    <P>
      When first version of the layout is created, even if it looks and works great,
      work here only begins. User interfaces constantly change:
    </P>
    <Ul>
      <Li>we improve and fix usability issues</Li>
      <Li>we fix browsers incompatibility issues and other general bugs</Li>
      <Li>we work with content</Li>
      <Li>we run A/B and other types of split tests.</Li>
    </Ul>
    <P>
      It means we are moving our components back and forth all the time.
      This continuous process is the speciality of frontend development.
      Probably those points pushed the community to a component-centric
      architecture in client apps.
    </P>
    <P>
      However, <C>Component</C> for most of the developers means markup and css.
      But the main thing I like about <C>Component</C> is that it’s not limited
      to two of those, but it has a power to encapsulate all related parts:
      visual representation and
      {' '}
      <B>behavior</B>
      . If you feel frustrated using classic
      Redux file structure, try to restructure your modules around UI elements.
      In my case, this was a major productivity boost.
    </P>

    <Image type="fill" src={uiUnitImage} alt="UI Unit" />

    <P>
      <B>UI unit</B> is only element of the user interface, like a modal,
      or a widget, or a form. In the project tree it encapsulates all its related parts
      inside a single folder. UI units can be nested, but they are not coupled
      to each other (thanks to Redux). You can move them around like blocks.
      Easy to manage, easy to remove, and easy to reason about.
      Every time you work with the UI element, it’s like focus mode:
      you’re always in the context of what you’re doing and everything you need
      is right here at your fingertips.
    </P>

    <P>
      Let’s take a look at the example. In <B>Listing Edit Screen</B> host
      can edit the location of his property: he clicks on the address line
      and a modal with the form shows up:
    </P>

    <Image type="fill" src={formImage} alt="Location form" />

    <P>
      This modal is a UI unit. Here is how it looks like in the project tree:
    </P>
    <Snippet>
      {`
        app/
          |-- components/
              |-- ...
              |-- ListingEdit/
                  |-- ...
                  |-- LocationModal/
                      |-- components/
                          |-- index.jsx
                          |-- index.css
                      |-- actions.js
                      |-- index.js
                      |-- reducer.js
                      |-- selectors.js
      `}
    </Snippet>
    <P>
      This unit encapsulates representation of this modal and logic of related interactions:
    </P>
    <Ul>
      <Li>show / hide modal</Li>
      <Li>update form state</Li>
      <Li>update map state</Li>
      <Li>update server state (submit form).</Li>
    </Ul>
    <P>
      Logic is decoupled from representation, but, at the same time,
      it exists in isolation in context of UI element.
    </P>

    <Expandable label="Tip: Minimize amount of logic in your markup">
      <P>
        If you find yourself doing some complex conditions in your JSX,
        consider delegating it to selectors. This will make markup simple and readable.
      </P>
    </Expandable>

    <P>
      Of course, you can split the modal and form itself into 2 UI units. It’s up to you.
      However, I prefer to keep them together for 2 reasons:
    </P>
    <Ul>
      <Li>
        <B>Reasonable amount of reducers</B><br />
        When everything has its own reducer, Redux DevTools tree becomes quite big.
      </Li>
      <Li>
        <B>Animations</B><br />
        If modal transitions are animated, hide modal and reset state are different stories:
        first hide modal, and only when it’s gone from UI — reset state to avoid content flashing.
        It’s easier to handle such cases when the state is managed by a single reducer.
      </Li>
    </Ul>

    <Divider />

    <P>
      In the next post I’ll dive into UI unit folder and share my findings
      in typing Redux parts with Flow.
    </P>
    <P>Stay tuned!</P>
  </Post>
);

export default withPostMeta(YearOfDevelopmentWithReduxPartII, {
  type: 'article',
  description: 'Alternative structure of Redux apps.',
});
