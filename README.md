# Backend-Aero-Oil

A lightweight Node.js/Express backend for the [AERO-OIL Gas Station Web App](https://github.com/BigSmoke45/Gas-Station-Network-Web-App), deployed on Render.com.

Its main purpose is to keep sensitive credentials (Firebase config, TonCenter API key) out of the client-side frontend code. The frontend fetches what it needs from this server at runtime.

---

## API Endpoints

### `GET /`
Health check. Returns `"Aero-Oil API is running"`.

### `GET /firebase-config`
Returns the Firebase project configuration as JSON, read from environment variables. Used by the frontend to initialize the Firebase SDK without hardcoding any credentials.

**Response example:**
```json
{
  "apiKey": "...",
  "authDomain": "firstproj-14ff.firebaseapp.com",
  "databaseURL": "https://firstproj-14ff-default-rtdb.firebaseio.com",
  "projectId": "firstproj-14ff",
  "storageBucket": "firstproj-14ff.appspot.com",
  "messagingSenderId": "...",
  "appId": "..."
}
```

### `GET /balance/:address`
Proxies a TON wallet balance request to the TonCenter API using a server-side API key. The key is never exposed to the browser.

**Response:** raw TonCenter API response with `result` field (balance in nanotons).

---

## Tech Stack

`Node.js` · `Express.js 5` · `node-fetch` · `dotenv` · `cors`

---

## Environment Variables

Create a `.env` file in the root (never commit this):

```env
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DB_URL=https://your_project-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=your_project
FIREBASE_STORAGE=your_project.appspot.com
FIREBASE_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

API_KEY=your_toncenter_api_key

PORT=3000
```

---

## Run locally

```bash
npm install
node server.js
```

Server starts on `http://localhost:3000`.

---

## Deployment

Deployed on [Render.com](https://render.com) as a Web Service. All environment variables are set in the Render dashboard — no `.env` file needed in production.

Start command: `node server.js`

---

