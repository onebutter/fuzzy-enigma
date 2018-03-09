FROM node:carbon-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app

WORKDIR /app
ADD . /app

EXPOSE 4000

CMD ["npm", "start"]
