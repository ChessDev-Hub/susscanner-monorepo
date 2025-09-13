FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
ENV VITE_API_BASE=http://localhost:8000
CMD ["npm","run","dev","--","--host","0.0.0.0"]
