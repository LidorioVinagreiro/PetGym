FROM node:alpine

RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install express bcryptjs passport passport-local ejs express-ejs-layouts mongoose connect-flash express-session
RUN npm install mysql
RUN npm install -S body-parser
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]