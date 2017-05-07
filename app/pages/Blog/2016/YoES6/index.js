/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, A, Ol, Ul, Li, C, Snippet } from 'app/components';
import withPostMeta from 'app/shell/withPostMeta';

const YoES6 = (props: $PostProps) => (
  <Post {...props}>
    <P>
      The only thing I officially couldn’t write using ES6 syntax/Babel is
      {' '}
      <A href="http://yeoman.io" targetBlank>Yeoman generator</A>.
      Even it’s not something I write too often, this limitation is quite annoying
      when you actually write it. Here’s the workaround I came up with.
    </P>

    <H2>Build generator</H2>
    <Ol>
      <Li>
        Create your generator project directory (you can use
        {' '}
        <A href="https://github.com/yeoman/generator-generator" targetBlank>
          generator-generator
        </A>
        {' '}
        for this).
      </Li>
      <Li>
        Create generator file within <C>generators/*</C> folder
        with any name, but not <C>index.js</C>.
        I usually call it <C>index.es6</C>.
      </Li>
      <Li>
        Write your generator in ES6 (see notes below how to make it more ES6’ish).
      </Li>
      <Li>
        Setup your Babel environment as usual
        (install modules, configure <C>.babelrc</C> etc.).
      </Li>
      <Li>
        Build your generator:
      </Li>
    </Ol>
    <Snippet lang="bash">
      babel --out-file generators/app/index.js generators/app/index.es6
    </Snippet>
    <P>
      That’s it. You can use your generator written in ES6.
    </P>

    <H2>Make generator more ES6’ish</H2>
    <P>
      Use <C>class</C> syntax to create your Yeoman generator:
    </P>
    <Ul>
      <Li>
        Use <C>constructor</C> instead of <C>initializing</C> method
        to attach your stuff to the instance.
      </Li>
      <Li>
        Use class methods to define generator methods.
      </Li>
      <Li>
        Use ES6 class <C>getters</C> to define generator properties.
      </Li>
    </Ul>
    <Snippet lang="js">
      {`
        import Yeoman from 'yeoman-generator';

        class MyGenerator extends Yeoman.Base {
          // Using constructor() instead of initializing()
          constructor(...args) {
            super(...args);
            this.myStuff = ...;
          }

          // Using class methods
          prompting() {
            const done = this.async();
            this.log(yosay('Welcome to the ... generator!'));
            // ...
          }

          // Using ES6 class getter to define class property
          get writing() {
            return {
              app() { ... },
            };
          }

          // ...
        }

        // Exporting generator to Node as CommonJS module
        module.exports = MyGenerator;
      `}
    </Snippet>

    <P>
      Here is an example of generator written in ES6 and published as npm module:
      {' '}
      <A href="https://github.com/alexfedoseev/generator-react-sandbox-server">
        <C>generator-react-sandbox-server</C>
      </A>
    </P>
  </Post>
);

export default withPostMeta(YoES6, {
  type: 'article',
  description: 'How to write Yeoman generator using ES6.',
});
