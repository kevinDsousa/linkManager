FROM node:lts

RUN apt-get update && apt-get install -y bash

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

USER node

CMD ["npx", "prisma", "studio"]
