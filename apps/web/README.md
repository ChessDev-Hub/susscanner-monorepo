# susscanner (React + TS + Tailwind + Vite)

## Dev
```powershell
npm i
'VITE_API_URL=http://127.0.0.1:8000' | Out-File .env.local -Encoding utf8  # point to your local FastAPI
npm run dev
```

## Build & Preview
```powershell
npm run build
npm run preview
```

## Deploy to GitHub Pages
1. Create GitHub repo named **susscanner**.
2. Push this project to `main`. The included workflow publishes automatically.
3. In GitHub → Settings → Pages → Source: **GitHub Actions**.

Vite base is set to `/susscanner/` in `vite.config.ts`.
Default production API: `.env.production` → `VITE_API_URL=https://sus-scanner-api.onrender.com`
