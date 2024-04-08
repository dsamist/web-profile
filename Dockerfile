#using nginx as the base image
FROM nginx:latest

#create arguements for secrets (certificates and configuration)

ARG CERTIFICATE_CRT
ARG CERTIFICATE_KEY
ARG NGINX_CONF
#copy nginx configuratio
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./$NGINX_CONF /etc/nginx/conf.d/default.conf

#copy ssl files to the image
#COPY ./dsamist_me_cert/ /etc/nginx/ssl/
COPY ./$CERTIFICATE_CRT /etc/nginx/ssl/dsamist_me.crt
COPY ./$CERTIFICATE_KEY /etc/nginx/ssl/dsamistme.key

#copy the files to the nginx document root directory
COPY . /usr/share/nginx/html

EXPOSE 443
EXPOSE 80