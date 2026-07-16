# ─── Stage 1: instalar dependencias ───────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# DIRECT_URL es necesaria para que prisma.config.ts cargue durante el postinstall
# No se conecta a ninguna BD, solo es para que prisma generate no falle
ENV DIRECT_URL=postgresql://dummy:dummy@localhost:5432/dummy

RUN pnpm install --frozen-lockfile --prod=false

# ─── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
COPY . .

# Variables de entorno mínimas para que el build no falle
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# NEXT_PUBLIC_* se incrustan en el bundle en build time
ENV NEXT_PUBLIC_SUPABASE_URL=https://pjepbxbphppvmowmbcrf.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZXBieGJwaHBwdm1vd21iY3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1OTYzNTcsImV4cCI6MjA4NTE3MjM1N30.iZTF9dRQTainAmsZ_1mqctovUra_GfU3euef7ChmS8U
ENV NEXT_PUBLIC_PAYPAL_CLIENT_ID=AfGRsFzZti7TrHa_Ve2rYg86MSX9BBuRGr8OL14QvBdugFa5dW_IjvlhJKv_94HBMMDN63DmXZDg_AqY

RUN pnpm build

# ─── Stage 3: imagen final ────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# bash: Dokploy ejecuta los comandos programados con `bash -c`
# curl: para disparar el endpoint del cron desde la tarea programada
RUN apk add --no-cache bash curl

# Usuario sin privilegios
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Archivos estáticos públicos
COPY --from=builder /app/public ./public

# Standalone output (incluye solo node_modules necesarios)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cliente Prisma generado (necesario en runtime)
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
