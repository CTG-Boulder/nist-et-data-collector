FROM node:14

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN yarn cache clean
RUN yarn install
EXPOSE 80
CMD ["yarn", "start"]
