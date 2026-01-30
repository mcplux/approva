FROM node:24.13-alpine

COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "start:dev" ]
