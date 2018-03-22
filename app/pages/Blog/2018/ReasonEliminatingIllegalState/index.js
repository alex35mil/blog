/* @flow */
/* eslint-disable no-useless-escape, react/no-unescaped-entities */

import * as React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, C, A, Snippet } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

const ReasonEliminatingIllegalState = (props: $PostProps) => (
  <Post {...props}>
    <P>
      Next thing I’d like to share is how{' '}
      <A href="https://reasonml.github.io">ReasonML</A> helps in making illegal
      states unrepresentable in our apps.
    </P>
    <P>Here’s the common pattern of shaping a state in JS:</P>
    <Snippet lang="js">
      {`
        type State = {|
          loading: boolean,
          data: Data | null,
          error: Error | null,
        |};
      `}
    </Snippet>

    <P>What’s wrong with this? Let’s see how it can be handled in UI:</P>
    <Snippet lang="js">
      {`
        render = () =>
          <div>
            {this.state.loading && <Spinner />}
            {!this.state.loading &&
              !this.state.error &&
              <div>{this.state.data.foo}</div>
            }
            {this.state.error && <div>{this.state.error.message}</div>}
          </div>
      `}
    </Snippet>

    <P>It can be improved a bit by re-shaping this state:</P>
    <Snippet lang="js">
      {`
        type State = {|
          status: "loading" | "ready" | "error",
          data: Data | null,
          error: Error | null,
        |};

        render = () => {
          switch (this.state.status) {
          case "loading":
            return <Spinner />;
          case "ready":
            return <div>{this.state.data.foo}</div>;
          case "error":
            return <div>{this.state.error.message}</div>;
          default:
            throw new Error("¯\\_(ツ)_/¯");
          }
        }
      `}
    </Snippet>

    <P>
      But the main issue is still there: conditional dependencies between state
      properties. When <C>loading === false</C> (or <C>status === "ready"</C>)
      it implicitly assumes that <C>data</C> is not <C>null</C>. No guarantees
      tho. Opened doors into an illegal state.
    </P>
    <P>
      When you use Flow or TypeScript, these tools warn you that <C>data</C>{' '}
      might be <C>null</C> and you have to add all these annoying checks to calm
      type system down:
    </P>
    <Snippet lang="js">
      {`
        case "ready":
          if (!this.state.data) {
            throw new Error("Uh oh no data");
          }
          return <div>{this.state.data.foo}</div>;
      `}
    </Snippet>

    <P>I look at the code above and I’m just sad.</P>

    <H2>The light</H2>
    <P>
      First of all, let me introduce you to the thing called <C>variant</C>.
    </P>
    <Snippet lang="reason">
      {`
        type status =
        | Loading
        | Ready
        | Error;
      `}
    </Snippet>
    <P>
      This is type similar to <C>enum</C> in TS except its parts are not strings
      (nor any other data type you familiar with from JS). These things called{' '}
      <C>tags</C> (or <C>constructors</C>).
    </P>
    <P>
      Now the magic moment: every <C>tag</C> can hold its own payload!
    </P>
    <Snippet lang="reason">
      {`
        type status =
        | Loading
        | Ready('data)
        | Error('error);
      `}
    </Snippet>
    <P>
      If you’re not there yet, here’s the code (mixing Reason & JS just for
      clarity’s sake!):
    </P>
    <Snippet lang="js">
      {`
        type Status =
        | Loading
        | Ready('data)
        | Error('error);

        type State = {status: Status};

        class Foo extends React.Component {
          state = {status: Loading};

          componentDidMount = () => {
            api.getData()
              .then(data => this.setState({status: Ready(data)}))
              .catch(error => this.setState({status: Error(error)}));
          };

          render = ({state}) => (
            <Layout>
              {
                switch (state.status) {
                | Loading => <Spinner />
                | Ready(data) => <div>{data.foo}</div>
                | Error(error) => <div>{error.message}</div>
                };
              }
            </Layout>
          );
        }
      `}
    </Snippet>
    <P>
      How beautiful is that! There’s no way to get into an illegal state in this
      component. Everything is type safe. Combine it with “everything is an
      expression” in Reason and you can use pattern matching at any point of
      your JSX render tree (spot <C>switch</C> as a child of{' '}
      <C>{`<Layout />`}</C>).
    </P>

    <P>
      You know{' '}
      <A href="https://reasonml.github.io/docs/en/quickstart-javascript.html">
        what to do
      </A>.
    </P>
  </Post>
);

export default withPostMeta(ReasonEliminatingIllegalState, {
  type: 'article',
  description: 'ReasonML: Eliminating illegal state',
});
