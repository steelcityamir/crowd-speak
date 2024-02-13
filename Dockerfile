FROM node:21-alpine

WORKDIR /app/client

# Copy the npm files needed to build API
COPY client/package*.json ./

# Install dependencies for the client
RUN npm install

# Copy JS files
COPY client/*.js .

# Produces crowdspeak.min.js into /app/client/dist/ and /app/api/public/
RUN npm run build

WORKDIR /app/api

# Copy the npm files needed to build API
COPY api/package*.json ./

# Install dependencies for the API
RUN npm install

# Copy the JS files needed to run Express
COPY api/*.js .

# Delete client directory which is no longer needed
RUN rm -rf /app/client

# Expose the port your app runs on
EXPOSE 3000

# Start the API
CMD [ "node", "app.js" ]
