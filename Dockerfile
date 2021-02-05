FROM navikt/node-express:12.18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /var/server

COPY server/ ./server
WORKDIR /var/server/server
COPY build/ ./build

RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
