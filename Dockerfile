# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Set the environment variables for ElasticSearch
ENV ELASTICSEARCH_HOST=elasticsearch
ENV ELASTICSEARCH_PORT=9200

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]