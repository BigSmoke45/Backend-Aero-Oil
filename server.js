import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

// проверка
app.get("/", (req, res) => {
  res.send("Aero-Oil API is running");
});

//firebase БД
app.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
});

// баланс TON
app.get("/balance/:address", async (req, res) => {
  try {
    const address = req.params.address;

    console.log("Запрос баланса:", address);

    const response = await fetch(
      `https://toncenter.com/api/v2/getAddressBalance?address=${address}&api_key=${process.env.API_KEY}`
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(400).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
