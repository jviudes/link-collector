FROM node:14-alpine3.10 AS build

COPY . .
RUN npm ci  
RUN npm audit 
RUN npm run test  
RUN npm run build && NODE_ENV=production npm prune


FROM node:14-alpine3.10
RUN apk update
RUN apk upgrade
RUN apk add curl
COPY --from=build build .
COPY --from=build node_modules ./node_modules
ENTRYPOINT [ "node" ]
CMD [ "index.js" ]