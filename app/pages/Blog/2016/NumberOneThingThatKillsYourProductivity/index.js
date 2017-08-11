/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, P, B } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const NumberOneThingThatKillsYourProductivity = (props: $PostProps) =>
  <Post {...props}>
    <P>
      It’s not a routine, not meetings. Not even social networks or messengers.
    </P>
    <P>
      #1 thing that kills your productivity is{' '}
      <B>permanent long-term focus on one single project</B>.
    </P>
    <P>
      Imagine what’s going to happen if you’ll be eating same food every day
      during a year? Or to put a song on repeat and listening it for a few
      months? I bet you won’t want to have those things around for a very long
      time. Same thing happens when you are focused exclusively on single
      project: your mind’s just getting tired. This is human nature.
    </P>
    <P>
      To keep yourself up—periodically switch. Find some new stuff to keep your
      mind busy with and start doing this. Few hours a day, on the weekends or 1
      week in the month—adjust intervals and do yourself a favour—switch.
    </P>
  </Post>;

export default withPostMeta(NumberOneThingThatKillsYourProductivity, {
  type: 'article',
  description:
    'It’s not a routine, not meetings. Not even social networks or messengers.',
});
