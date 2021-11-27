FROM node:12

#create work directory
WORKDIR /app/nodeapi


#copy the json file

COPY package.* ./

RUN npm install


COPY . .

EXPOSE 1636

CMD [ "node", "./bin/www" ]