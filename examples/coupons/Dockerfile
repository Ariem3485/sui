FROM node:lts as dev

COPY ./package.json ./package-lock.json /app/
WORKDIR /app/
RUN npm clean-install
COPY . /app/
RUN npm run build

FROM node:lts as prod
ENV NODE_ENV=production
ENV API_SERVER=""
COPY --from=dev /app/package.json /app/package-lock.json /app/
WORKDIR /app/
RUN npm clean-install
COPY --from=dev /app/.next /app/.next
COPY ./public /app/public
WORKDIR /app/
CMD [ "npm", "start" ]
