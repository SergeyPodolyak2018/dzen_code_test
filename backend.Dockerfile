FROM node:20.18.0-alpine3.20
USER node
WORKDIR /home/app
RUN mkdir -p /home/app/server
COPY --chown=node:node ./server ./server
WORKDIR /home/app/server
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js"]
