FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:dev"]