FROM node:22 AS build

RUN apt-get update -y \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .


RUN DATABASE_URL=postgresql://postgres:placeholder@db:5432/postgres \
    npm run prisma:generate

RUN npm run build


FROM node:22

RUN apt-get update -y \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

EXPOSE 8000

CMD ["node", "dist/server.js"]