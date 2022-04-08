FROM node:lts as dev

COPY ./package.json ./package-lock.json /app/
WORKDIR /app/
RUN npm ci
COPY . /app/
RUN npm run build

FROM nginx as prod
EXPOSE 80
COPY --from=dev /app/build /app/
COPY ./nginx.config /nginx/
ENV API_SERVER="http://localhost:5001"
CMD /bin/bash -c "DOLLAR='$' envsubst < /nginx/nginx.config > /etc/nginx/conf.d/default.conf && more /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
