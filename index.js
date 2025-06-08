const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get("/", async (req, res) => {
  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: "Tospik buradayım komutan! 🐇",
    });

    res.send("Test mesajı gönderildi.");
  } catch (error) {
    console.error("Mesaj gönderilemedi:", error);
    res.status(500).send("Hata oluştu.");
  }
});

app.listen(3000, () => {
  console.log("Bot sunucusu ayakta!");
});
