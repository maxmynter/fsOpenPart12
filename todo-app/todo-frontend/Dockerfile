FROM node:16

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

RUN npm install -g serve


CMD [ "serve", "-l", "3001", "-s", "build"]
