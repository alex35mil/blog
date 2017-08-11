/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import {
  Post,
  H2,
  H3,
  P,
  B,
  A,
  C,
  Ol,
  Li,
  Note,
  Highlight,
  Expandable,
  Snippet,
  AnimatedGif,
} from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import coverImage from './images/cover.jpg?preset=cover';
import automatorAnimatedGif from './images/automator.gif';
import chromeAnimatedGif from './images/chrome.gif';

const Tableau = (props: $PostProps) =>
  <Post {...props} cover={coverImage}>
    <P>
      I’ve been lazily looking for a simple, flexible and lightweight new tab
      replacement for Google Chrome, but pretty much all of them, even paid
      ones, are unconfigurable and seem bloated.
    </P>

    <P>All I actually want comes down to:</P>
    <Ol>
      <Li>Nice background picture</Li>
      <Li>Date and time in a font I like</Li>
    </Ol>

    <P>Since it’s that simple, I just wrote my own thing.</P>

    <Highlight>
      <A href="https://github.com/alexfedoseev/tableau" targetBlank>
        Tableau
      </A>
    </Highlight>

    <H2>Installation</H2>
    <P>
      To be honest, I haven’t put much time/efforts in this, so installation is
      a bit cumbersome and (somewhat) automated only for MacOS users.
    </P>
    <Note>
      Give me a hint how to simplify it by submitting{' '}
      <A href="https://github.com/alexfedoseev/tableau/issues" targetBlank>
        issue
      </A>{' '}
      or{' '}
      <A href="https://github.com/alexfedoseev/tableau/pulls" targetBlank>
        PR
      </A>
      !
    </Note>

    <H3>#1 Get extension</H3>
    <P>Clone repo:</P>
    <Snippet lang="bash">
      {`
        git clone git@github.com:alexfedoseev/tableau.git
      `}
    </Snippet>
    <Note>
      Or{' '}
      <A href="https://github.com/alexfedoseev/tableau/archive/master.zip">
        download it
      </A>{' '}
      if you are not familiar with terminal.
    </Note>

    <H3>#2 Add images</H3>
    <P>
      Drop images you like in the <C>tableau/backgrounds</C> folder.
    </P>

    <H3>#3 Build images index</H3>
    <P>
      Next, we need to build an index of images for the extension. I do it via{' '}
      <C>Automator</C> (sorry, Windows users, I don’t have automated solution
      for you, but see below <B>What it actually does</B>).
    </P>
    <Ol>
      <Li>
        Find <C>Build.app</C> file in the root of repository and open it in{' '}
        <C>Automator</C> (DO NOT double-click it, but open <C>Automator</C> and
        then open <C>Build.app</C> in it).
      </Li>
      <Li>
        Switch to <B>Variables</B> panel: <C>View &gt; Variables</C>
      </Li>
      <Li>
        Double click <C>backgrounds</C> variable and choose{' '}
        <C>tableau/backgrounds</C> folder.
      </Li>
      <Li>Save and close.</Li>
    </Ol>

    <Expandable label="See it in action">
      <AnimatedGif
        src={automatorAnimatedGif}
        placement="bleed"
        alt="Automator"
        caption="Configure Build.app in Automator"
      />
    </Expandable>

    <P>
      Now, you can double-click <C>Build.app</C> and it will create{' '}
      <C>images.js</C> file for you.
    </P>
    <Note>
      FYI It will replace all spaces in image filenames with underscores.
    </Note>

    <Expandable label="What it actually does">
      <P>
        This workflow reads a content of the <C>tableau/backgrounds</C> folder
        and writes images index to the <C>tableau/images.js</C> file:
      </P>
      <Snippet lang="js" file="images.js">
        {`
          window.IMAGES = [
            'bells.jpg',
            'whistles.png',
            …
          ];
        `}
      </Snippet>
      <P>
        So, how you create and update this file is totally up to you. I.e. you
        can convert <C>Build.app</C> to folder watcher to automatically perform
        rebuilds or, if you’re Windows user and you have no idea how to write
        scripts, then you can create it manually and it will work.
      </P>
    </Expandable>

    <H3>#4 Load extension</H3>
    <P>Go to a Chrome’s Extensions list:</P>
    <Ol>
      <Li>
        Enable <B>Developer Mode</B> (check checkbox in an upper-right corner)
      </Li>
      <Li>
        Click “Load unpacked extension…” and choose folder with extension.
      </Li>
    </Ol>

    <Expandable label="See it in action">
      <AnimatedGif
        src={chromeAnimatedGif}
        placement="bleed"
        alt="Chrome"
        caption="Load Tableau in Chrome"
      />
    </Expandable>

    <P>Open a new tab and enjoy the view!</P>

    <H2>Adding new images</H2>
    <P>
      Every time you add new images to the <C>/backgrounds</C> folder, you
      should run <C>Build.app</C>, then <C>Reload</C> extension in Chrome’s
      Extensions list (there’s a link right under the extension name).
    </P>

    <H2>Customization</H2>
    <P>
      The extension doesn’t have any special configuration UI, but you can
      change just about everything by editing <C>index.html</C>,{' '}
      <C>index.css</C> & <C>index.js</C> files. The source code is dumb simple
      and it’s around 100 LOC incl. HTML & CSS.
    </P>
    <P>
      The most common thing you probably will want to change is a font-face. You
      can do it by editing line #2 in the <C>index.css</C>.
    </P>

    <P>That’s pretty much all. Enjoy!</P>
  </Post>;

export default withPostMeta(Tableau, {
  type: 'article',
  image: coverImage.fallback,
  description:
    'Tableau — simple, flexible and lightweight new tab replacement for Google Chrome.',
});
