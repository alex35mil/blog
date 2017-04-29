FROM node:7.9.0

RUN mkdir /blog
WORKDIR /blog

COPY package.json /blog
COPY yarn.lock /blog

RUN yarn
