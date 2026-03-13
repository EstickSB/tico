FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install

COPY prisma ./prisma
RUN bunx prisma generate

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma db push --skip-generate --accept-data-loss 2>&1 || echo 'DB push failed, starting anyway...' && bun run src/index.ts"]
