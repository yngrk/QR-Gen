
ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
WORKDIR /src

# Build stage
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .

RUN npm run build

# Runtime stage
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

COPY --from=build /src/server/data /src/server/data

COPY --from=build /src/public /src/public

EXPOSE $PORT

CMD ["node", ".output/server/index.mjs"]
