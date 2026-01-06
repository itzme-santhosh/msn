# 1️⃣ Use official Node.js image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for faster rebuilds)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --legacy-peer-deps

# 5️⃣ Copy project source code
COPY . .

# 6️⃣ Build the project
RUN npm run build

# 7️⃣ Expose application port
EXPOSE 3030

# 8️⃣ Start application
CMD ["npm", "run", "start"]
