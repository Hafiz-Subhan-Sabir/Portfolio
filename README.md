<<<<<<< HEAD
# Hafiz Subhan Portfolio

Frontend: **Next.js + TypeScript + Tailwind**  
Backend: **FastAPI (Python)** for contact email delivery

## Architecture

- `frontend` (this root app)
  - Portfolio UI
  - Contact form posting to backend
  - Chatbot with custom rule-based Q&A (frontend-only)
- `backend/`
  - `POST /api/contact`: sends visitor messages to your email
  - `GET /health`: health endpoint

## Local Development

### 1) Run frontend

```bash
npm install
npm run dev
```

Create root `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

### 2) Run backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Deploy Plan (Your Target Setup)

### Frontend on Vercel

1. Push repo to GitHub.
2. Import project in Vercel as Next.js.
3. Set env var in Vercel:
   - `NEXT_PUBLIC_API_BASE_URL=https://<your-pythonanywhere-domain>`
4. Deploy.

### Backend on PythonAnywhere

1. Deploy `backend/` code to PythonAnywhere.
2. Install `backend/requirements.txt` in virtualenv.
3. Add env vars from `backend/.env.example`.
4. Set `ALLOWED_ORIGINS` to include:
   - `https://<your-vercel-domain>`
   - `http://localhost:3000` (optional for local)
5. Restart web app and verify:
   - `https://<your-pythonanywhere-domain>/health`

## Email + Chat behavior

- Contact form sends messages to `hafizsubhan909@gmail.com` (configurable via backend env).
- Chatbot is fully custom and runs on frontend (no AI backend dependency).
- If visitor needs more detail, chatbot directs them to Contact.
=======
# Portfolio
Making a portfolio website using Next.tsx, Tailwind css, Gsap, Modern colors, Better animations, cool features, custom cursor, projects listing etc
>>>>>>> d1a6e2909c0283698a300cbb8c4a08ef26b315b4
