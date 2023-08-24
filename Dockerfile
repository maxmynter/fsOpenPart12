FROM node:16 AS build-test-stage

WORKDIR /usr/src/app

CMD CI=true npm test


FROM node:16 AS run-stag

WORKDIR /usr/src/app

COPY ./index.js ./index.js

CMD node index.js