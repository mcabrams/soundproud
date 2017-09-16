FROM nginx:1.13
EXPOSE 80
COPY ./config /etc/nginx/conf.d
RUN apt-get update && apt-get install -y wget
