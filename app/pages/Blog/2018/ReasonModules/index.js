/* @flow */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, B, C, A, Note, Snippet, Divider } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const ReasonModules = (props: $PostProps) => (
  <Post {...props}>
    <P>
      Recently, I’ve been investing quite a lot in learning{' '}
      <A href="https://reasonml.github.io">ReasonML</A> and TBH I’m pretty much
      dead as JS developer right now because I’ve seen the better world. Much
      better one.
    </P>
    <P>
      As a part of “Selling ReasonML to my colleagues” campaign (and to anyone,
      really), I’m going to spam your feeds from time to time with ReasonML
      related write-ups (hopefully, plural!). I’m too lazy these days to do epic
      monolithic posts so it’s going to be almost twitter-like shout-outs about
      the features I’m excited about the most.
    </P>
    <P>
      Ok, first one is definitely about <B>modules</B>. It seems this is the
      number one thing that confuses the most of newcomers from JS world (I was
      there!) so let’s start with it.
    </P>

    <H2>Fact #1: Each .re file is a module</H2>
    <P>
      Let’s say you created new file <C>Math.re</C>. Boom, you have a new module
      in your app called <C>Math</C>.
    </P>
    <Note>
      By convention, all filenames are capitalized to match module name. You can
      name file <C>math.re</C> but module name is still capitalized: <C>Math</C>.
    </Note>

    <H2>Fact #2: All content of a module is exported by default</H2>
    <P>
      If you create a type or a function or whatever inside your module it’s
      automatically available for module’s consumers using dot notation.
    </P>
    <Snippet lang="reason" file="Math.re">
      {`
        let sum = (a, b) => a + b;

        /* Now you can use \`Math.sum\` in another module */
      `}
    </Snippet>

    <H2>Fact #3: All modules are available globally</H2>
    <P>
      Let’s say you created file <C>App.re</C> and want to use <C>sum</C>{' '}
      function from <C>Math</C>. How can you import it? The answer is
      “You&nbsp;don’t&nbsp;need&nbsp;to!”. All your root modules are available
      everywhere in your app. You can use any of them once you need it without
      messing with imports.
    </P>
    <Snippet lang="reason" file="App.re">
      {`
        let onePlusTwo = Math.sum(1, 2);
      `}
    </Snippet>
    <P>
      Imagine when you implement some UI where you need <C>Button</C>,{' '}
      <C>Input</C>, <C>Link</C> etc etc: every time you need a new component in
      JS you have to go up, import it, go back to where you were. With Reason,
      you can just use whatever you want right here right now without
      interrupting your flow. So good! Once you’ll start using it, you’ll get
      how brilliant this is.
    </P>

    <H2>
      Fact #4: No folders (for the compiler), all filenames must be unique
    </H2>
    <P>
      Of course, you can use folders to group your files as you usually do
      (requires a bit of configuration) but for the compiler, all your files
      within a project is a flat list of modules. So all your files, no matter
      where they are located, must have unique names (remember, all modules are
      available globally). Compiler backs you up in case you accidentally
      created a file with a non-unique name.
    </P>
    <P>
      At the very beginning, it might seem inconvenient constraint but in
      reality, it makes the naming of your modules accurate and explicit across
      the entire app.
    </P>
    <P>E.g. in JS you can easily get into this state:</P>
    <Snippet lang="js" file="LoginButton.js">
      {`
        export default AuthButton extends React.Component {}
      `}
    </Snippet>
    <Snippet lang="js" file="LoginForm.js">
      {`
        import Button from "./LoginButton";
      `}
    </Snippet>
    <P>
      What a mess! If you ever decide to rename your component you have to
      change all these places to keep your naming accurate. Meh. In Reason
      world, you have only one source of truth: file name. So it’s always
      guaranteed accurate across the entire app.
    </P>
    <Divider />
    <P>
      More about the ReasonML modules in the{' '}
      <A href="https://reasonml.github.io/docs/en/module.html">
        official documentation
      </A>.
    </P>
  </Post>
);

export default withPostMeta(ReasonModules, {
  type: 'article',
  description: 'ReasonML modules',
});
