FROM navikt/node-express:12.2.0-alpine
ENV NODE_ENV production

RUN npm config set unsafe-perm true
RUN npm install -g helmet@3.21.3
RUN npm install -g node-cache@4.2.0
RUN npm install -g jsdom@16.4.0
RUN npm install -g request@2.88.2
RUN npm install -g fs-extra@8.1.0
RUN npm install -g @sanity/client@1.149.7
RUN npm install -g console-stamp@0.2.9
RUN npm install -g dotenv@8.2.0
RUN npm install -g http-proxy-middleware@^1.0.6

WORKDIR /app
COPY server/ ./server
COPY build/ ./build

WORKDIR /server

EXPOSE 3000

