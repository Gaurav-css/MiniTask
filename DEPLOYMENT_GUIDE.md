# Deployment Guide

For a full-stack Next.js + Node.js/Express application, we recommend a **Decoupled Deployment** strategy. This allows you to scale the frontend and backend independently and use the best platform for each.

## 1. Database (MongoDB Atlas)
**Why**: Managed cloud database, free tier available, secure by default.
1.  Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Whitelist `0.0.0.0/0` (or specific IPs from Render/Vercel) in Network Access to allow cloud connections.
3.  Get your Connection String: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/...`

## 2. Backend (Render.com)
**Why**: Excellent free tier for Node.js, auto-deploys from Git, supports HTTPS.
**Alternatives**: Railway, Heroku.

### Steps:
1.  Push your code to GitHub.
2.  Sign up at [Render](https://render.com).
3.  New **Web Service** -> Connect GitHub Repo.
3.  **Settings**:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install && npm run build`
    - **Start Command**: `npm start`
4.  **Environment Variables** (Add these in the Dashboard):
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A secure random string for tokens.
    - `PORT`: `10000` (default for Render).
    - `MAILJET_API_KEY` & `MAILJET_API_SECRET`: For emails.
    - `SENDER_EMAIL`: The verified email in Mailjet.
    - `FRONTEND_URL`: The URL of your future Vercel app (e.g., `https://minitask.vercel.app`) - used for CORS security.
    - **NOTE**: Do NOT add `NEXT_PUBLIC_...` variables here.

5.  **Deploy**: Render will give you a URL (e.g., `https://minitask-api.onrender.com`).

## 3. Frontend (Vercel)
**Why**: Created by Next.js authors, edge network, instant deployments.
**Alternatives**: Netlify.

### Steps:
1.  Sign up at [Vercel](https://vercel.com).
2.  New **Project** -> Connect GitHub Repo.
3.  **Settings**:
    - **Root Directory**: `frontend`
    - **Build Command**: `next build` (default)
4.  **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: Set this to your **Render Backend URL** (e.g., `https://minitask-api.onrender.com/api`).
    - **NOTE**: Do NOT add `MONGO_URI` or backend secrets here.
5.  **Deploy**: Vercel will give you a live URL (e.g., `https://minitask.vercel.app`).

---

## 🚀 Post-Deployment Checklist
- [ ] **CORS**: Update `backend/src/app.ts` to allow the new Vercel Frontend domain in `cors({ origin: '...' })`.
- [ ] **Mailjet**: Verify the sender email in Mailjet if you are in the sandbox environment.
- [ ] **Health Check**: Visit `https://your-backend.onrender.com/` to verify it's running.
