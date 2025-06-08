const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const message = '🔔 RABBIT PANEL - TEST MESAJI';
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: process.env.CHAT_ID,
    text: message
  });
  res.send('Test mesajı gönderildi.');
});

app.post('/webhook', async (req, res) => {
  const { coin, fiyat, uyari_turu, adet, hedef_fiyat } = req.body;

  if (!coin || !fiyat || !uyari_turu || !adet || !hedef_fiyat) {
    return res.status(400).send('Eksik veri!');
  }

  const formattedMessage = `
🔺 ${uyari_turu}: ${coin}
💲 Mevcut Fiyat: ${fiyat} USDT
🎯 Hedef Fiyat: ${hedef_fiyat} USDT
📦 Adet: ${adet.toLocaleString('tr-TR')}
  `;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: formattedMessage
    });
    res.status(200).send('Webhook mesajı gönderildi.');
  } catch (error) {
    console.error('Telegram gönderim hatası:', error.response?.data || error.message);
    res.status(500).send('Mesaj gönderilemedi.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
