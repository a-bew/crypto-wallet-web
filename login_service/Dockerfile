# Use official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
