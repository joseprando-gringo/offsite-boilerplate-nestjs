# Get NPM packages
FROM node:16.14.2-alpine3.14 as dependencies
ARG PROFILE_ARG
RUN apk add --no-cache libc6-compat
RUN echo $PROFILE_ARG
WORKDIR /app
COPY package.json package-lock.json ./
#COPY newrelic.js ./
RUN npm i

# Rebuild the source code only when needed
FROM node:16.14.2-alpine3.14 as builder
ARG PROFILE_ARG
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build $PROFILE_ARG

# Production image, copy all the files and run the app
FROM node:16.14.2-alpine3.14 as runner
ARG PROFILE_ARG
WORKDIR /app

ENV NODE_ENV production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
#COPY --from=dependencies /app/newrelic.js ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start", $PROFILE_ARG]
