/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, P, Ul, Li } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const CodeDiet = (props: $PostProps) =>
  <Post {...props}>
    <P>
      For the past 3 (+/–) years my relationships with the code can be described
      as relationships of fatty with the fridge, at 3 AM, after alcohol.
      Development was a funky magic runaway train I was late for and I had to
      push hard to catch up. But now, when I can state that I jumped in, I must
      get on the diet to keep going.
    </P>
    <P>
      No, it’s still same (and even bigger) fun playing with all these shiny new
      tech toys and do the stuff that I’m doing, but what actually bothers me:
    </P>
    <Ul>
      <Li>
        Amount of time spent on solving / debating on issues, that has nothing
        to do with the real world problems: terrifying.
      </Li>
      <Li>
        Number of books (not focused on specific tech) I read in the past 3
        years: 0 (zero).
      </Li>
      <Li>Text notes made outside git repos: close to zero.</Li>
    </Ul>
    <P>
      Code is extremely powerful matter, but code for code is road to nowhere
      (of course there are exceptions, but I’m not one of them for sure).
    </P>
  </Post>;

export default withPostMeta(CodeDiet, {
  type: 'article',
  description:
    'For the past 3 (+/–) years my relationships with the code can be described as relationships of fatty with the fridge, at 3 AM, after alcohol.',
});
