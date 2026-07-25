# MarrowLabs Website

Marketing site for the MarrowLabs ecosystem — MarrowLink, MarrowLink Hub, and Marrow Studio for BONELAB.

## Stack

- Next.js 15 (App Router, TypeScript strict)
- Tailwind CSS v4
- Framer Motion v11
- shadcn/ui (Radix)
- lucide-react

## Develop

```bash
npm install
npm run dev
```

## Verify

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Deploy

Vercel-ready by default. For static export, uncomment `output: "export"` in `next.config.ts`.
