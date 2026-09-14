FROM node:20 AS build

RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app

COPY package*.json tsconfig.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:20

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# Copy the native query engine binary — tsc doesn't compile/copy non-.ts files,
# so this has to be moved explicitly, sitting next to the compiled client code.
COPY --from=build /app/src/generated/prisma/libquery_engine-debian-openssl-3.0.x.so.node ./dist/generated/prisma/

EXPOSE 8000

CMD ["node", "dist/server.js"]