FROM oven/bun:latest
RUN groupadd app && useradd -g app --home-dir /app --create-home app
WORKDIR /app 
COPY ./web/package.json ./web/bun.lockb ./web/tsconfig.json ./web/tsconfig.node.json ./web/index.html ./
COPY ./web/src ./src
COPY ./web/public ./public

RUN bun install && bun run build

# RUN chown -R app /app && chmod -R 700 /app
# USER app ##disable for dev
CMD ["bun","run","serve"]