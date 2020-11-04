FROM navikt/node-express:12.18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV NODE_EXTRA_CA_CERTS /etc/ssl/ca-bundle.pem

WORKDIR /app
COPY server/ ./server
COPY build/ ./build

RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["node", "server/server.js"]
