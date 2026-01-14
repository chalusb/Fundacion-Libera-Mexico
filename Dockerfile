FROM node:20-alpine AS base

WORKDIR /app

# Enable pnpm via Corepack
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "4321"]

