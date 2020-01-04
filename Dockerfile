# build stage
FROM node:12.14.0-alpine3.11 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17.6-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginxEntryPoint.sh .
EXPOSE 80
ENTRYPOINT ["./nginxEntryPoint.sh"]
