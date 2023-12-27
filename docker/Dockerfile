FROM oven/bun:latest
RUN groupadd app && useradd -g app --home-dir /app --create-home app
WORKDIR /app 
COPY package.json bun.lockb tsconfig.json tsconfig.node.json index.html ./
COPY src ./src
COPY public ./public

RUN bun install && bun run build

# RUN chown -R app /app && chmod -R 700 /app
# USER app ##disable for dev
CMD ["bun","run","preview"]