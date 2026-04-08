# ThreadCraft — Project Documentation

> **Living document.** Updated with every change. Intended for handoff to other AI builders or developers.

---

## What Is This App?

**ThreadCraft** is a single-page web app that converts YouTube video transcripts into ready-to-post tweets or threads using Google AI Studio (Gemini API).

- **No login, no signup, no paywall.** Just the tool, open and free.
- **No usage limits** on the app itself (for now).
- Users can choose their **X (Twitter) account type** (Free = 280 char limit per tweet, Verified/Pro = longer tweets allowed), and the AI adjusts its output accordingly.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Vite + React | Fast dev server, modern build tooling |
| Styling | Vanilla CSS | Dark theme, custom properties for design tokens |
| Font | Inter (Google Fonts) | Modern sans-serif |
| AI API | Google AI Studio (Gemini) | Handles long transcripts, generates tweet content |
| Transcript Fetch | `youtube-transcript` npm package | Extracts YouTube captions server-side |
| Serverless Backend | Netlify Functions | Two functions: transcript fetching + Gemini API proxy |
| Deployment | Netlify | Auto-deploy from GitHub |

---

## Features

### ✅ Built (v1)
- [x] YouTube URL input → auto-fetch transcript via serverless function
- [x] Paste Transcript input → manual text entry
- [x] Output format selector: Single Tweet / Thread
- [x] X account type selector: Free (280 chars) / Verified (longer)
- [x] AI generation via Gemini API (serverless function)
- [x] Single tweet output card with copy button
- [x] Thread output: 5–8 numbered tweet cards, each with copy button
- [x] "Copy All" button for threads
- [x] Dark theme UI with electric violet accent
- [x] Responsive design (mobile-friendly)

### 🔲 Planned (v1)
> _All v1 features are currently implemented._

### 💡 Future Ideas
- [ ] Tone selector (Professional, Casual, Controversial, Educational)
- [ ] Regenerate button (try again with same input)
- [ ] Edit tweets inline before copying
- [ ] Share thread as image
- [ ] Usage analytics

---

## File Structure

```
youtube-transcribt to tweets/
├── public/
│   └── favicon.svg
├── netlify/
│   └── functions/
│       ├── get-transcript.js      ← Fetches YouTube transcript (server-side)
│       └── generate-tweets.js     ← Calls Gemini API (server-side)
├── src/
│   ├── App.jsx                    ← Main app component, all state management
│   ├── App.css                    ← All styles (single file, dark theme)
│   ├── main.jsx                   ← Vite entry point
│   ├── components/
│   │   ├── Header.jsx             ← "ThreadCraft" branding + tagline
│   │   ├── InputSection.jsx       ← Two tabs: YouTube URL / Paste Transcript
│   │   ├── FormatSelector.jsx     ← Pill toggle: Single Tweet / Thread
│   │   ├── AccountTypeSelector.jsx← Free X / Verified toggle
│   │   ├── GenerateButton.jsx     ← Generate button with loading state
│   │   ├── OutputSection.jsx      ← Renders output cards
│   │   └── TweetCard.jsx          ← Single tweet card with copy button
│   └── utils/
│       └── api.js                 ← API helper functions for serverless calls
├── .env                           ← GEMINI_API_KEY (gitignored, never pushed)
├── netlify.toml                   ← Netlify build/deploy config
├── package.json
├── index.html
├── PROJECT_DOC.md                 ← THIS FILE
└── .gitignore
```

---

## API Key Configuration

The **Gemini API key** is stored in exactly **one place**:

**File:** `.env` (project root, line 1)
```
GEMINI_API_KEY=your_api_key_here
```

- This file is listed in `.gitignore` — it is **never** committed to Git
- For production, the same key must be added in the **Netlify dashboard**: Site Settings → Environment Variables → Add `GEMINI_API_KEY`
- The serverless function `netlify/functions/generate-tweets.js` reads it via `process.env.GEMINI_API_KEY`

---

## How It Works (Architecture)

```
User (Browser)
  │
  ├─ Pastes YouTube URL
  │    → POST /.netlify/functions/get-transcript { videoUrl }
  │    → Serverless function uses youtube-transcript package
  │    → Returns { transcript: "..." }
  │
  ├─ OR pastes transcript text directly
  │
  ├─ Selects: Single Tweet or Thread
  ├─ Selects: Free X or Verified
  ├─ Clicks Generate
  │    → POST /.netlify/functions/generate-tweets { transcript, format, accountType }
  │    → Serverless function calls Gemini API with crafted prompt
  │    → Returns { tweets: ["...", "...", ...] }
  │
  └─ Output cards rendered with copy buttons
```

---

## Changelog

### 2026-04-07 — Implementation Phase
- Scaffolded Vite + React application.
- Added dependencies: `youtube-transcript`, `@google/generative-ai`, `@netlify/functions`.
- Created backend: Serverless functions for fetching transcript out of browser (`get-transcript.js`) and querying Gemini securely (`generate-tweets.js`).
- Created frontend: Clean, dark-mode CSS (`App.css`). Modular React components handling state efficiently (`App.jsx`, `InputSection.jsx`, `FormatSelector.jsx`, `AccountTypeSelector.jsx`, `GenerateButton.jsx`, `OutputSection.jsx`, `TweetCard.jsx`).
- Verified local build.

### 2026-04-07 — Project Planning
- Created project documentation (`PROJECT_DOC.md`)
- Created implementation plan
- Decided on tech stack: Vite + React + Netlify Functions + Gemini API
- Defined file structure, component breakdown, and user flow

---

## Problems & Solutions Log

> _Track issues encountered during development and how they were resolved._

| # | Problem | Solution | Date |
|---|---------|----------|------|
| 1 | `youtube-transcript` package doesn't work in browser (CORS) | Use Netlify serverless function as server-side proxy | 2026-04-07 (planned) |
| 2 | Gemini API key would be exposed in frontend code | Keep API key in `.env`, call Gemini only from serverless function | 2026-04-07 (planned) |

---

## Design Tokens

```css
/* Colors */
--bg-primary: #0a0a0f;
--bg-card: #141420;
--border-card: #1e1e30;
--accent: #7c3aed;
--accent-hover: #6d28d9;
--text-primary: #f0f0f5;
--text-secondary: #8888a0;

/* Typography */
--font-family: 'Inter', sans-serif;

/* Spacing */
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
```

---

## Notes for Next AI Builder

1. **Read this file first** before making any changes
2. **Update this file** after every feature addition, bug fix, or design change
3. The `.env` file is not in the repo — you need to create it locally with the Gemini API key
4. All YouTube/Gemini calls go through serverless functions — **never** call external APIs directly from the frontend
5. The app is intentionally simple for v1 — tone selector and other features are planned for later iterations
