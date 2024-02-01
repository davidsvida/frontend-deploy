# Stage 1: Build with Node.js (specific version)
FROM node:14.17.0 as build-stage
WORKDIR /app
# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install --frozen-lockfile
# Copy the rest of your app's source code
COPY . .
# Build your app
RUN yarn build

# Stage 2: Setup Nginx
FROM nginx:mainline

# Set labels (optional, for metadata)
LABEL io.k8s.description="Platform for serving static HTML files" \
      io.k8s.display-name="Nginx 1.17.4" \
      io.openshift.expose-services="8080:http" \
      io.openshift.tags="builder,html,nginx,devops"

# Perform necessary permissions and setup for Nginx
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx && \
    mkdir -p /nginx/html && \
    chown -R 1001:0 /nginx/html && \
    sed -i.bak1 's/root\(.*\)\/usr\/share\/nginx\/html;/root \/nginx\/html;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak2 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf && \
    usermod -aG root nginx

# Copy built files from the build-stage to Nginx directory
COPY --from=build-stage /app/build /nginx/html

# Copy .env and env.sh into the Nginx directory
COPY env.sh .env /nginx/html/

# Expose the port Nginx is reachable on
EXPOSE 8080

# Set user
USER 1001

# Run command (mimicking the run script)
CMD ["/bin/bash", "-c", "cd /nginx/html && ./env.sh && /usr/sbin/nginx -g 'daemon off;'"]
