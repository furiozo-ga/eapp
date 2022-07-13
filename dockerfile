FROM node:12-alpine

# Create app directory
WORKDIR /app

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .
COPY eapp.mjs .
COPY package.json .
RUN npm i --omit=dev
#COPY node_modules node_modules

#EXPOSE 8080
#STOPSIGNAL SIGINT

CMD [ "node", "eapp.mjs" ]
#CMD [ "ls", "-l" ]
