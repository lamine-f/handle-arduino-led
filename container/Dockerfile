# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY script ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory

# Expose the port on which your Node.js application listens
EXPOSE 8000

ENV NODE_ENV=production

# Start the Node.js application
CMD ["node", "app.js"]
