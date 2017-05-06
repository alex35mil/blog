/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, H3, P, B, I, Link, List, Note, Image } from 'app/components';
import withPostMeta from 'app/shell/withPostMeta';

import coverImage from './images/cover.jpg';
import draftImage from './images/01-draft.png';
import corsImage from './images/02-cors.png';
import proxyImage from './images/03-proxy.png';

const IsomorphicReactWithRailsPartI = (props: $PostProps) => (
  <Post cover={coverImage} {...props}>
    <P>
      I’d like to share intermediate results of my work with
      Universal (aka “Isomorphic”) JavaScript apps, based on
      {' '}
      <Link targetBlank to="http://facebook.github.io/react/">
        React
      </Link>
      {' '}
      library from Facebook and
      {' '}
      <Link targetBlank to="http://rubyonrails.org">Ruby on Rails</Link>
      {' '}
      as backend.
    </P>
    <Note>
      Actually, it’s not so much about Rails, but about JSON API.
      So if you don’t use/like Rails, just take it as an abstract API and keep reading.
    </Note>
    <P>
      If you haven’t heard about isomorphic javascript concept, here is
      {' '}
      <Link targetBlank to="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps">
        the link
      </Link>
      {' '}
      that explains what it’s all about.
    </P>

    <H2>Planning the application</H2>
    <P>
      I’ve been trying to implement JS server side rendering within Rails app using
      {' '}
      <Link targetBlank to="https://github.com/reactjs/react-rails">
        react-rails
      </Link>
      {' '}
      gem, but it’s not the way to go. Tools play best in environments,
      for which they were designed. So I cut whole front-end stuff out of Rails
      and moved it to <B>Node.js</B>.
    </P>

    <P>Here is the first draft:</P>
    <Image type="fill" src={draftImage} alt="Draft" />

    <P>
      Rails, which became simply <B>JSON API</B>, is responsible for data
      and React handles UI part using the same javascript codebase
      on the server and on the client.
      Worth to note that we can use Rails as API for mobiles app
      and other services interested in our data.
    </P>
    <P>
      Let’s go deeper. When user hits <B><I>http://my-app.com</I></B>,
      request goes to a Node.js server with Express on top.
      We need data to render initial html and send a response.
      So we fetch it from Rails API via http request. When data are arrived,
      React renders a view and Express sends html to the client with JS app,
      which takes control over the flow. When a user hits some link on the site,
      app makes an ajax call to fetch new data and updates views on the client.
    </P>
    <P>
      Front-end app lives on the main domain —<B><I>http://my-app.com</I></B>.
      But for API we have options:
    </P>
    <List ordered>
      <List.Item>
        <B>my-app.com:3000</B><br />
        We can have it on the same domain, but on a different port.
        Then we are forced to keep 2 apps on the same server.
      </List.Item>

      <List.Item>
        <B>api.my-app.com</B><br />
        I prefer another option—put it on a subdomain (or another domain),
        so we can scale app in the future without changing a codebase.
      </List.Item>
    </List>

    <P>
      Next we need to decide how data will be fetched from API.
    </P>

    <H3>Option 1. Ajax CORS requests</H3>
    <Image type="bleed" src={corsImage} alt="CORS" />

    <P>
      Because of the
      {' '}
      <Link
        targetBlank
        to="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      >
        same-origin policy
      </Link>
      {' '}
      we can’t make ajax requests from one location to another
      (even if a target resource on the same domain but different port).
      To enable such kind of requests we must apply{' '}
      <B>Cross-Origin Resource Sharing (CORS)</B> mechanism.
    </P>

    <P>
      If you’ll choose to go this way, you need to set
      special http headers on a Rails side.
      This way browser is verifying that caller have the rights
      to send ajax requests to this server.
    </P>
    <P>
      Keep in mind that by enabling CORS (especially public access)
      you dig potential <B>CSRF security hole</B>. Read
      {' '}
      <Link targetBlank to="https://github.com/pillarjs/understanding-csrf">
        this
      </Link>
      {' '}
      carefully to mitigate CSRF attacks.
    </P>

    <H3>Option 2. Proxy ajax calls through front-end server</H3>
    <Image type="bleed" src={proxyImage} alt="Proxy" />

    <P>
      Instead of enabling CORS, we can proxy requests
      through <B>nginx</B> front-end server.
      Every call goes to the same domain: <B><I>my-app.com</I></B>.
      Nginx splits it in two directions:
    </P>
    <List>
      <List.Item>
        <I>my-app.com/*</I><br />
        Almost all of requests are passed to Node.js app.
      </List.Item>
      <List.Item>
        <I>my-app.com/api/*</I><br />
        Except calls to `/api`, which are proxied to Rails API.
      </List.Item>
    </List>
    <P>
      This approach is more secure and whole system looks solid from outside.
      So we will go this way, but it requires some additional setup on local machine.
    </P>

    <H2>Local setup</H2>
    <P>
      Install <B>nginx</B>:
    </P>
  </Post>
);

export default withPostMeta(IsomorphicReactWithRailsPartI, {
  type: 'article',
  description: 'Isomorphic JavaScript apps with React and Ruby on Rails as backend.',
});
