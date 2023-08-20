FROM node:16

COPY --chown=node:node . .
RUN npm ci 

ENV DEBUG=playground:*

USER node
CMD npm start