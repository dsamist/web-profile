#using nginx as the base image
FROM nginx:latest

#copy nginx configuratio
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#copy ssl files to the image
COPY ./dsamist_me_cert/ /etc/nginx/ssl/

#copy the files to the nginx document root directory
COPY . /usr/share/nginx/html

EXPOSE 443
EXPOSE 80