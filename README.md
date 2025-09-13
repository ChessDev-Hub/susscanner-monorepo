# SusScanner (clean monorepo)

## Layout
```
apps/
  api/  # FastAPI
  web/  # React + Vite + Tailwind
packages/shared/  # future shared code
```

## Dev
### API
```bash
cd apps/api && pip install -r requirements.txt && python main.py
```
### Web
```bash
cd apps/web && npm ci && cp .env.example .env && npm run dev
```
Open http://localhost:5173
