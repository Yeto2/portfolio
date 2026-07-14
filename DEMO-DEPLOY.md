# Portfolio live demos — deployment (100% free stack)

You do **not** need Render. Render’s free tier no longer supports WebSockets, and paid plans start around $7/mo per service.

Use this instead:

| Layer | Platform | Cost |
|-------|----------|------|
| Portfolio + 3 demo UIs (`web/`) | **Vercel** | Free |
| 3 APIs (Fastify + WebSocket + SQLite) | **Fly.io** | Free allowance* |

\* Fly.io gives free shared VMs and storage for hobby use. Card may be required for signup; portfolio traffic stays within free limits. Machines auto-sleep when idle.

---

## Overview (repeat × 3 projects)

```
GitHub repo
├── API (root)     →  Fly.io   (Docker + SQLite volume)
└── web/           →  Vercel   (Root Directory: web)
```

| Repo | Fly app name (default) | Vercel root |
|------|------------------------|-------------|
| delivery-tracking | `yeto2-delivery-api` | `web` |
| saas-boilerplate | `yeto2-saas-api` | `web` |
| ai-support-rag | `yeto2-ai-support-api` | `web` |

---

## Quick start

### 1. Install Fly CLI

https://fly.io/docs/hands-on/install-flyctl/

```bash
fly auth signup   # or fly auth login
```

### 2. Deploy each API (example: delivery-tracking)

```bash
cd delivery-tracking
fly launch --no-deploy --copy-config --yes
fly volumes create delivery_data --region cdg --size 1
fly secrets set JWT_SECRET="$(openssl rand -hex 32)"
fly secrets set CORS_ORIGINS="https://placeholder.vercel.app"
fly deploy
```

Repeat for `saas-boilerplate` and `ai-support-rag` (see each repo’s `DEPLOY.md` for volume names).

### 3. Deploy each UI on Vercel

- Import GitHub repo
- **Root Directory:** `web`
- Env: `NEXT_PUBLIC_API_URL` = `https://yeto2-XXX-api.fly.dev`
- Deploy

### 4. Connect CORS

After you have each Vercel URL:

```bash
fly secrets set CORS_ORIGINS="https://your-demo.vercel.app" -a yeto2-delivery-api
```

### 5. Portfolio env vars (Vercel → portfolio project)

```
NEXT_PUBLIC_DEMO_DELIVERY_URL=https://….
NEXT_PUBLIC_DEMO_SAAS_URL=https://….
NEXT_PUBLIC_DEMO_AI_URL=https://….
```

Redeploy portfolio → **Live demo** buttons work.

---

## Per-repo guides

- [delivery-tracking/DEPLOY.md](../delivery-tracking/DEPLOY.md)
- [saas-boilerplate/DEPLOY.md](../saas-boilerplate/DEPLOY.md)
- [ai-support-rag/DEPLOY.md](../ai-support-rag/DEPLOY.md)

---

## If you cannot use Fly.io (no card)

| Platform | WebSockets | Card | Notes |
|----------|------------|------|--------|
| **Railway** | Yes | Optional | ~$5 free credits/month |
| **Koyeb** | Yes | No | 1 free nano service |
| **Bonto** | Yes | No | 75 hrs/month runtime |

Still deploy `web/` on Vercel; only the API host changes.

---

## Why not everything on Vercel?

These demos need:

- **WebSockets** (live tracking + streaming chat) — Vercel serverless does not support persistent connections
- **SQLite file DB** — Vercel has no persistent disk

So: **Vercel for UI, Fly.io for API** is the simplest free combination.
