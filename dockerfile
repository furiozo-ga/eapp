FROM node:12-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .
COPY eapp.mjs .
COPY node_modules node_modules

EXPOSE 8080
#STOPSIGNAL SIGINT

CMD [ "node", "eapp.mjs" ]
#CMD [ "ls", "-l" ]