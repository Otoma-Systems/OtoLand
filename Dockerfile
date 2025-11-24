# Use an official Nginx base image
FROM nginx:1.24-alpine

# Copy your application's static files to the Nginx serving directory
COPY src/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The default command runs Nginx
CMD ["nginx", "-g", "daemon off;"]