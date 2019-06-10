/* @flow */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import { H2, Post, P, B, I, A, Ul, Ol, Li, Highlight } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const Minima = (props: $PostProps) => (
  <Post {...props}>
    <P>
      It’s been almost 7 years since I shut down Excel and opened text editor to
      build this MVP.
    </P>

    <H2>TL;DR</H2>
    <Highlight>
      <A href="https://minima.app" targetBlank>
        minima.app
      </A>
    </Highlight>

    <H2>The long version</H2>
    <P>
      In my PM times, I was dealing with migration from the company’s current
      project management solution to something else. We had quite a requirements
      and I spent a long time to investigate solutions on the market. While
      doing this, I shaped up my vision of <B>minima</B>.
    </P>

    <P>There were a few main concerns I wanted to address:</P>
    <Ul>
      <Li>
        Every project management tool I tried was lacking personal space. It was
        all around the team, but I always felt the need in my very own personal
        space where I can conveniently manage my own tasks. So I had to
        cherry-pick things from N task trackers into my to-do list to build up
        my working pool. The core idea of minima is that all users get personal
        space first, which will remain theirs forever, and then they can join
        teams, one or many, and benefit from being a part of the single system.
      </Li>
      <Li>
        One of the consequences of this is a simplification of communication
        between companies and contractors: the latter don’t have to have dozens
        of accounts for each client and the former can easily invite folks to
        the team just by searching for their account on <B>minima</B>.
      </Li>
      <Li>
        Solutions for teams never really implemented GTD flow and I was eager to
        try to apply this pattern in this field.
      </Li>
      <Li>
        Web UIs was far behind desktop software in terms of UX: keyboard
        navigation, shortcuts, feedback, buttons for everything: it’s all felt
        clunky. Since I wasn’t a developer, I couldn’t imagine how hard would it
        be to address this point (it’s HARD) but I’m still trying to bring
        minima as close as possible to the desktop experience.
      </Li>
    </Ul>
    <P>There were two options to kick it off:</P>
    <Ol>
      <Li>Search for investors and do only product/management part.</Li>
      <Li>Learn to code and implement it myself.</Li>
    </Ol>
    <P>I always had a motto:</P>
    <Highlight>
      You can’t efficiently manage the area that you didn’t master yourself
    </Highlight>
    <P>
      So naturally, I chose the latter and despite the fact that it took so much
      time, I never ever regretted this decision. Moreover, at this point, I’m
      pretty sure I wouldn’t be able to build something like this even if I had
      money and resources.
    </P>

    <H2>The current state of things</H2>
    <Ul>
      <Li>
        The app is in public beta, it’s going to remain free for some time.
      </Li>
      <Li>
        I’m starting with the Personal Workspace. Teams are in the prototype
        stage.
      </Li>
      <Li>
        I consider the current mobile version as a hacky workaround to make the
        app <I>reachable</I> from mobile devices. The mobile app will make it
        usable.
      </Li>
    </Ul>
    <Highlight>
      <A href="https://minima.app" targetBlank>
        minima.app
      </A>
    </Highlight>
    <P>Phew!</P>
  </Post>
);

export default withPostMeta(Minima, {
  type: 'article',
  description:
    'It’s been almost 7 years since I shut down Excel and opened text editor to build this MVP.',
});
