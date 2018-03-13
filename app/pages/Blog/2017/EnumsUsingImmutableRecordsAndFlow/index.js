/* @flow */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, I, A, C, AnimatedGif, Snippet } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import enumAnimatedGif from './images/enum.gif';

const EnumsUsingImmutableRecordsAndFlow = (props: $PostProps) => (
  <Post {...props}>
    <P>
      If you use{' '}
      <A href="http://facebook.github.io/immutable-js/" targetBlank>
        <C>immutable-js</C>
      </A>{' '}
      and{' '}
      <A href="https://flow.org" targetBlank>
        <C>flow</C>
      </A>{' '}
      in your projects, you can have statically type-checked Enums. This means
      you’ll get errors right in your editor and on CI if you try to access an
      Enum property that is misspelled or doesn’t exist.
    </P>

    <H2>Immutable Record</H2>
    <P>
      <C>Record</C> is a data type that enforces a specific set of allowed
      string keys on its instances. Once you define what a record consists of,
      it’s not possible to set unexpected properties on that record instance.
    </P>
    <Snippet lang="js">
      {`
        const User = Record({ name: 'Default' });
        const user = new User();
        user.get('name')         // => 'Default'
        user.set('name', 'Alex') // => Record<{ name: 'Alex' }>
        user.set('namw', 'Alex') // => throws
                     ^
                     typo
      `}
    </Snippet>
    <P>Record also allows access to its keys using common dot notation:</P>
    <Snippet lang="js">{`user.name // => 'Default'`}</Snippet>
    <P>
      <A
        href="http://facebook.github.io/immutable-js/docs/#/Record"
        targetBlank
      >
        <I>More details in official docs</I>
      </A>
    </P>

    <H2>Enum</H2>
    <P>Let’s create a simple Enum factory:</P>
    <Snippet lang="js">
      {`
        const createEnum = <T: Object>(items: T): Record<T> => {
          const Enum = Record(items);
          return new Enum();
        };
        const MyEnum = createEnum({ A: 'a', B: 'b' });
        MyEnum.get('A'); // => 'a'
        MyEnum.get('C'); // => undefined
                    ^
                    flow throws on unexpected key
      `}
    </Snippet>
    <P>
      That’s fine, but sometimes I need helper methods on an enum instance. For
      example, sometimes I need to get an array of all of the enum’s defined
      items. Other times, I might need to find the item by the <C>value</C> key,
      e.g.,:
    </P>
    <Snippet lang="js">
      {`
        const MyEnum = createEnum({
          THING: {
            value: 'thing',
            label: 'The label for the thing',
          },
        });
        MyEnum.fromValue('thing').label // => 'The label for the thing'
      `}
    </Snippet>

    <H2>Extended Enum</H2>
    <P>
      Luckily, you can extend the Record class and add custom methods to it:
    </P>
    <Snippet lang="js">
      {`
        /* @flow */

        import { Record } from 'immutable';

        interface $EnumInterface<T: Object> extends Record<T> {
          items: Function;
          fromValue: Function;
        }

        const createEnum = <T: Object>(items: T): $EnumInterface<T> => {
          class Enum extends Record(items) {
            // \`this\` here is an instance of Record so all instance methods are available!
            items = () => this.toArray();
            fromValue = value => this.find(item => item.value === value);
          }

          return new Enum();
        };

        export default createEnum;
      `}
    </Snippet>
    <P>This is how it works in the end:</P>
    <AnimatedGif src={enumAnimatedGif} placement="bleed" alt="Enum" />

    <P>
      P.S. The examples above work with <C>immutable@3.8.1</C>. Typedefs in
      Immutable v4 (RC at the moment) were significantly improved, but are still
      in flux for the extended records. Hopefully, these issues will be resolved
      soon!
    </P>
  </Post>
);

export default withPostMeta(EnumsUsingImmutableRecordsAndFlow, {
  type: 'article',
  description:
    'If you use immutable-js and flow in your projects, you can have statically type-checked Enums.',
});
