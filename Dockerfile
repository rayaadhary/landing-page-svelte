FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/src/lib/server/db ./src/lib/server/db
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "build"]
