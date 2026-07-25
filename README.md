# MarrowLabs Website

Marketing site for the MarrowLabs ecosystem — MarrowLink, MarrowLink Hub, and Marrow Studio for BONELAB.

## Stack

- Next.js 15 (App Router, TypeScript strict)
- Tailwind CSS v4
- Framer Motion v11
- shadcn/ui (Radix)
- lucide-react

## Run locally (live reload)

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/austinjerrellsma-ui/MarrowLabs-Website.git
cd MarrowLabs-Website
git checkout main
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

- Edits you save under `src/` refresh automatically.
- Stop the server with `Ctrl+C`.

### If you already cloned the repo

```bash
cd MarrowLabs-Website
git pull origin main
npm install
npm run dev
```

### Other useful commands

```bash
npm run build    # production build
npm run start    # serve the production build (after build)
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

## Deploy

Vercel-ready by default (`vercel.json` pins the Next.js framework). For static export, uncomment `output: "export"` in `next.config.ts`.
