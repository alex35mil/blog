FROM ubuntu:16.04

RUN \
  apt-get update && \
  apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  apt-get install -y \
    nodejs \
    yarn \
    python \
    build-essential

ENV APP=/home/app
ENV DEPS=/home/deps

RUN mkdir $DEPS
COPY package.json yarn.lock $DEPS/
RUN cd $DEPS && yarn

RUN mkdir $APP
WORKDIR $APP

COPY scripts/entrypoint /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]

CMD ["yarn", "start"]
