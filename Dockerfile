FROM ubuntu:17.04

ENV HOME /web-starter-kit

WORKDIR ${HOME}
ADD . $HOME

# node --
ENV NODE 8
ENV PATH $HOME/.yarn/bin:$PATH

RUN \
  curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && \
  apt-get install -y nodejs
# -- node

RUN yarn

EXPOSE 8000 8080
