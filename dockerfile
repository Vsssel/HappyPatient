# Use Node.js for building the application
FROM node:20 AS builder

WORKDIR /app

# Copy and install dependencies
COPY ./package*.json ./
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Use a lightweight image for running the app
FROM node:20-slim

WORKDIR /app

# Copy necessary files from the builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output /app/.output

# Install production dependencies
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
