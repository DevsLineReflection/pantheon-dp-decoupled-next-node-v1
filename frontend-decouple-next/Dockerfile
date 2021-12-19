FROM node:12

#create work directory
WORKDIR /app/web

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]