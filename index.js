const express = require('express');
const axios = require('axios');
require('dotenv').config();
require('./rabbitScheduler'); // Zamanlayıcıyı dahil ediyoruz

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Tarayıcıdan test için GET endpoint
app.get('/', async (req, res) => {
  const message = '🔔 RABBIT PANEL - TEST MESAJI';
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: message
    });
    res.send('Test mesajı gönderildi.');
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    res.status(500).send('Mesaj gönderilemedi.');
  }
});

// Dış sistemlerden gelen verileri Telegram'a yönlendirmek için webhook
app.post('/webhook', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).send('Hatalı veri: text eksik');

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text
    });
    res.send('Mesaj gönderildi.');
  } catch (error) {
    console.error('Telegram gönderim hatası:', error);
    res.status(500).send('Mesaj gönderilemedi.');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu ${PORT} portunda çalışıyor.`);
});
