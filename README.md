# Verdoq — AI Document Decoder

Verdoq is a full-stack document analysis application that helps users decode complex legal and financial documents (Leases, Contracts, Policies) into plain English. It highlights red flags, provides a risk score, and offers an AI chat interface to ask follow-up questions.

## Features
- **Upload & Paste**: Support for PDF, DOCX, and raw text.
- **AI Analysis**: Powered by GPT-4o for accurate, plain-English summaries and section breakdowns.
- **Risk Assessment**: Detects red flags (low, medium, high severity) and calculates a 0-100 risk score, visualized with animated SVG arcs.
- **Document Chat**: Ask contextual follow-up questions about specific documents.
- **Browser Extension**: A Chrome extension to instantly decode any webpage.
- **Stunning UI**: Dark mode, glassmorphism, fluid animations (Framer Motion), and responsive design.

## Architecture
- **Backend (DDD)**: Node.js, Express, TypeScript, Mongoose. Follows strict 4-layer Domain-Driven Design (Domain → Application → Infrastructure → Interfaces).
- **Frontend Web App**: React 18, TypeScript, Vite, Tailwind CSS, Zustand, React Router.
- **Browser Extension**: Manifest V3, React UI, Vite multi-entry build.
- **Auth**: Google OAuth 2.0 with JWT.

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster URL
- OpenAI API Key
- Google Cloud Console project (for OAuth credentials)

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values:
   - `MONGODB_URI`
   - `OPENAI_API_KEY`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_CALLBACK_URL` (http://localhost:5000/api/auth/google/callback)
   - `JWT_SECRET`
   - `FRONTEND_URL` (http://localhost:5173)
4. Start the server: `npm run dev`

### 3. Frontend Web App Setup
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values:
   - `VITE_API_BASE_URL` (http://localhost:5000)
4. Start the dev server: `npm run dev`

### 4. Browser Extension Setup
1. `cd extension`
2. `npm install`
3. Build the extension: `npm run build`
4. Load in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension/dist` folder.

## Usage
- Open `http://localhost:5173` in your browser.
- Login with Google.
- Upload a document or try the extension on any legal webpage!
