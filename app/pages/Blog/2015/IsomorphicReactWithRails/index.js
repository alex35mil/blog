/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, H3, P, B, I, A, C, Ul, Ol, Li, Note, Image, Snippet } from 'app/components';

import withPostMeta from 'app/shell/withPostMeta';

import coverImage from './images/cover.jpg?preset=cover';
import draftImage from './images/01-draft.png?preset=inline';
import corsImage from './images/02-cors.png?preset=inline';
import proxyImage from './images/03-proxy.png?preset=inline';

const IsomorphicReactWithRailsPartI = (props: $PostProps) => (
  <Post
    {...props}
    cover={coverImage}
    credit={{
      author: 'Blueprint of Victory',
      url: 'https://commons.wikimedia.org/wiki/File:Blueprint_of_Victory_-_NARA_-_534555.jpg',
    }}
  >
    <P>
      I’d like to share intermediate results of my work with
      Universal (aka “Isomorphic”) JavaScript apps, based on
      {' '}
      <A href="http://facebook.github.io/react/" targetBlank>
        React
      </A>
      {' '}
      library from Facebook and
      {' '}
      <A href="http://rubyonrails.org" targetBlank>Ruby on Rails</A>
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
      <A href="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps" targetBlank>
        the link
      </A>
      {' '}
      that explains what it’s all about.
    </P>

    <H2>Planning the application</H2>
    <P>
      I’ve been trying to implement JS server side rendering within Rails app using
      {' '}
      <A href="https://github.com/reactjs/react-rails" targetBlank>
        react-rails
      </A>
      {' '}
      gem, but it’s not the way to go. Tools play best in environments,
      for which they were designed. So I cut whole front-end stuff out of Rails
      and moved it to <B>Node.js</B>.
    </P>

    <P>Here is the first draft:</P>
    <Image src={draftImage} placement="fill" alt="Draft" />

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
    <Ol>
      <Li>
        <B>my-app.com:3000</B><br />
        We can have it on the same domain, but on a different port.
        Then we are forced to keep 2 apps on the same server.
      </Li>

      <Li>
        <B>api.my-app.com</B><br />
        I prefer another option—put it on a subdomain (or another domain),
        so we can scale app in the future without changing a codebase.
      </Li>
    </Ol>

    <P>
      Next we need to decide how data will be fetched from API.
    </P>

    <H3>Option 1. Ajax CORS requests</H3>
    <Image src={corsImage} placement="bleed" alt="CORS" />

    <P>
      Because of the
      {' '}
      <A
        href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
        targetBlank
      >
        same-origin policy
      </A>
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
      <A href="https://github.com/pillarjs/understanding-csrf" targetBlank>
        this
      </A>
      {' '}
      carefully to mitigate CSRF attacks.
    </P>

    <H3>Option 2. Proxy ajax calls through front-end server</H3>
    <Image src={proxyImage} placement="bleed" alt="Proxy" />

    <P>
      Instead of enabling CORS, we can proxy requests
      through <B>nginx</B> front-end server.
      Every call goes to the same domain: <B><I>my-app.com</I></B>.
      Nginx splits it in two directions:
    </P>
    <Ul>
      <Li>
        <I>my-app.com/*</I><br />
        Almost all of requests are passed to Node.js app.
      </Li>
      <Li>
        <I>my-app.com/api/*</I><br />
        Except calls to <C>/api</C>, which are proxied to Rails API.
      </Li>
    </Ul>
    <P>
      This approach is more secure and whole system looks solid from outside.
      So we will go this way, but it requires some additional setup on local machine.
    </P>

    <H2>Local setup</H2>
    <P>
      Install <B>nginx</B>:
    </P>
    <Snippet lang="bash">
      brew install nginx
    </Snippet>

    <P>
      Edit <B>nginx.conf</B>:
    </P>
    <Snippet lang="bash">
      sudo $EDITOR /usr/local/etc/nginx/nginx.conf
    </Snippet>

    <P>
      Extend <C>http</C> block in the config with upstreams:
    </P>
    <Snippet lang="nginx">
      {`
        http {
          upstream app_proxy {
            server lvh.me:3500;
          }
          upstream api_proxy {
            server api.lvh.me:3000;
          }
          server {
            listen 80;
            server_name lvh.me;
            location / {
              proxy_set_header Host $http_host;
              proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
              proxy_set_header X-NginX-Proxy true;
              proxy_pass http://app_proxy;
              proxy_redirect off;
            }
            location /api {
              proxy_set_header Host api.lvh.me;
              proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
              proxy_set_header X-NginX-Proxy true;
              proxy_pass http://api_proxy/;
              proxy_redirect off;
            }
          }
          server {
            listen 80;
            server_name api.lvh.me;
            location / {
              proxy_set_header Host $http_host;
              proxy_set_header X-forwarded-for $proxy_add_x_forwarded_for;
              proxy_set_header X-NginX-Proxy true;
              proxy_pass http://api_proxy;
              proxy_redirect off;
            }
          }
        }
      `}
    </Snippet>

    <P>
      Finally, run nginx:
    </P>
    <Snippet lang="bash">
      sudo nginx
    </Snippet>

    <P>
      Now you can visit <B><I>http://lvh.me</I></B> in your browser.
      There will be nginx error message. It’s ok, because Node.js app is not yet running.
    </P>

    <P>
      Stop nginx for now:
    </P>
    <Snippet lang="bash">
      sudo nginx -s stop
    </Snippet>

    <H3>Hosts</H3>
    <P>
      Also, you may want to add <C>lvh.me</C> to <C>hosts</C> file
      to avoid unnecessary roundtrips:
    </P>
    <Snippet lang="bash">
      sudo $EDITOR /private/etc/hosts
    </Snippet>

    <P>And add:</P>
    <Snippet>
      {`
        fe80::1%lo0   lvh.me
        fe80::1%lo0   api.lvh.me

        127.0.0.1     lvh.me
        127.0.0.1     api.lvh.me
      `}
    </Snippet>

    <H2>Update</H2>
    <P>
      You can find other posts of this series on
      {' '}
      <A href="https://medium.com/@alexfedoseev" targetBlank>my medium</A>
      {' '}
      but they are pretty much out of date.
    </P>
  </Post>
);

export default withPostMeta(IsomorphicReactWithRailsPartI, {
  type: 'article',
  image: coverImage,
  description: 'Isomorphic JavaScript apps with React and Ruby on Rails as backend.',
});
