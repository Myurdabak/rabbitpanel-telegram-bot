const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // JSON body için middleware

// Tarayıcıdan elle test için
app.get('/', async (req, res) => {
  const message = '🔔 RABBIT PANEL - TEST MESAJI';
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: process.env.CHAT_ID,
    text: message
  });
  res.send('Test mesajı gönderildi.');
});

// Yeni: Rabbit Panel'den POST alacak endpoint
app.post('/webhook', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Hatalı veri: text eksik');
  }

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: text
    });
    res.send('Mesaj gönderildi.');
  } catch (error) {
    console.error('Telegram gönderim hatası:', error);
    res.status(500).send('Mesaj gönderilemedi.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
