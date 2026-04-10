import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// проверка
app.get("/", (req, res) => {
  res.send("Сервер работает 🚀");
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

app.listen(3000, () => {
  console.log("🔥 Server started: http://localhost:3000");
});