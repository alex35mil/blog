/* @flow */

import React from 'react';
import { oneLine } from 'common-tags';

type $Props = {|
  status: number,
  message: string,
|};

export const Error = ({ status, message }: $Props) =>
  <html lang="en">
    <head>
      <base href="/" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>
        {status} | alexfedoseev.com
      </title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <style type="text/css">
        {oneLine`
          body {
            font-family: Menlo, Consolas, Courier New, monospace;
            font-size: 16px;
            font-weight: 400;
            font-style: normal;
            color: #333;
          }
          .container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100vh;
          }
          .status {
            font-size: 4em;
          }
          .divider {
            margin: 20px;
            border: 0;
            border-left: 1px solid #eee;
          }
          .message {
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .links a {
            color: inherit;
          }
          @media screen and (max-width: 420px) {
            .container {
              flex-direction: column;
              text-align: center;
            }
            .status {
              margin-bottom: 10px;
            }
            .divider {
              display: none;
            }
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="status">
          {status}
        </div>
        <hr width="1" size="100" className="divider" />
        <div className="info">
          <div className="message">
            {message}
          </div>
          <div className="links">
            try: <a href="/">main</a> <a href="/blog">blog</a>
          </div>
        </div>
      </div>
    </body>
  </html>;
