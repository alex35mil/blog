FROM nginx:1.13

COPY nginx.conf /etc/nginx/
COPY ./certs/alexfedoseev.dev.pem /etc/ssl/certs/
COPY ./certs/alexfedoseev.dev.key /etc/ssl/private/

CMD ["nginx", "-g", "daemon off;"]
