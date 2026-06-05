#  WanderWay — Tailored Travel Booking Platform

A full-stack travel booking web app with a FastAPI backend, real-time booking summaries, dark mode, and localStorage persistence.

---

##  Project Overview

WanderWay is a responsive travel booking platform where users can browse curated travel packages, filter/search/sort them, and submit bookings via a live-summary form. Confirmed bookings are stored locally and synced to a FastAPI backend with a graceful offline fallback.

---

##  Problem It Solves

Most travel booking demos are static mockups. WanderWay bridges the gap between frontend interactivity and backend integration — it handles real form validation, async API calls, loading states, error recovery, and persistent booking history, making it portfolio-ready for full-stack roles.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (CSS Variables), Vanilla JS (ES6+) |
| Backend | Python, FastAPI, Uvicorn |
| Data Validation | Pydantic |
| Fonts & Icons | Google Fonts (Inter), Font Awesome 6 |
| Persistence | localStorage (client), in-memory list (server) |
| HTTP | Fetch API, CORS middleware |

---

##  How to Run

### 1. Clone the repo
```bash
git clone https://github.com/Nidazah/wanderway.git
cd wanderway
```

### 2. Start the FastAPI backend
```bash
pip install fastapi uvicorn
python main.py
# Runs at http://localhost:8000
```

### 3. Open the frontend
Open `index.html` in your browser directly, or use a live server:
```bash
# VS Code Live Server extension (recommended)
# OR
npx serve .
```

> **Offline mode:** If the backend isn't running, the app auto-falls back to a local booking reference generator — no crashes.

---

##  Future Improvements

- [ ] Replace in-memory `bookings_db` with a real database (PostgreSQL + SQLAlchemy)
- [ ] Add user authentication (JWT-based login/register flow)
- [ ] Email confirmation via SMTP or SendGrid
- [ ] Payment gateway integration (Stripe)
- [ ] Admin dashboard to manage and view all bookings
- [ ] Image optimization and lazy loading for package cards
- [ ] Deploy frontend to Vercel, backend to Railway or Render

---

##  Features at a Glance

-  Live search + category filter + price/duration sort
-  Real-time booking summary that updates as you type
-  Dark/light mode with localStorage persistence
-  Loading spinner with async API call + offline fallback
-  Booking history panel (localStorage-backed)
-  Fully responsive layout

---

*Built by [Nida Zahra](https://linkedin.com/in/nidazahra24) · [GitHub](https://github.com/Nidazah)*
