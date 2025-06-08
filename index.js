const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test mesajı için (tarayıcıdan erişimle çalışır)
app.get('/', async (req, res) => {
  const message = '🔔 RABBIT PANEL - TEST MESAJI';
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: process.env.CHAT_ID,
    text: message
  });
  res.send('Test mesajı gönderildi.');
});

// Webhook endpoint'i: JSON veri ile akıllı mesaj gönderir
app.post('/webhook', async (req, res) => {
  try {
    const { coin, fiyat, uyari_turu, adet, hedef_fiyat } = req.body;

    if (!coin || !fiyat || !uyari_turu) {
      return res.status(400).send('Eksik veri!');
    }

    const formattedMessage = `
🚨 ${uyari_turu.toUpperCase()}: ${coin}
💰 Mevcut Fiyat: ${fiyat} USDT
${hedef_fiyat ? `🎯 Hedef Fiyat: ${hedef_fiyat} USDT\n` : ''}${adet ? `📦 Adet: ${adet.toLocaleString()}` : ''}
    `;

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: formattedMessage.trim(),
    });

    res.send('Mesaj başarıyla gönderildi.');
  } catch (error) {
    console.error('Webhook hatası:', error.message);
    res.status(500).send('Bir hata oluştu.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
