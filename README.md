# Text Summarizer

Lightweight project that provides a web front-end and a Node.js back-end for summarizing text.

Repository structure
- `front-end/` — Vite + React front-end.
- `back-end/` — Minimal Node.js API server.

Prerequisites
- Node.js 14+ and npm

Quick start
1. Install dependencies for both parts:
   - `cd back-end && npm install`
   - `cd ../front-end && npm install`
2. Start development servers:
   - Back-end: `cd back-end && npm start` or `node server.js`
   - Front-end: `cd front-end && npm run dev`

Build for production
- Front-end: `cd front-end && npm run build` then serve the `dist/` folder.
- Back-end: run the production server process (e.g., `node server.js`) behind your preferred process manager.

Where to look
- Front-end sources: `front-end/src/`
- Back-end entry: `back-end/server.js`

Contributing
- Open an issue or submit a PR with small, focused changes.
