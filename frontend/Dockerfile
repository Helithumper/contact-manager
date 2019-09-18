FROM node:12.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/deployment/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# CMD ["nginx"]