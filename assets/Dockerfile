FROM node:6.11
WORKDIR /django
COPY ./main/package.json ./main/yarn.lock /django/
# Add node modules to path
ENV PATH $PATH:/django/node_modules/.bin
RUN yarn install
ADD main ./
RUN npm run build
