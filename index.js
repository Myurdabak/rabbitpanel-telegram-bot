const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const message = `🔔 RABBIT PANEL – TEST MESAJI\n\n🐇 Sistem Aktif!\n📡 Telegram bağlantısı başarılı şekilde kuruldu.\n\n🧠 Tospik seni tanıyor, sinyalleri izliyor ve anında bildirecek.\n\n⏱ Tarih: ${new Date().toLocaleString()}`;
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: process.env.CHAT_ID,
    text: message
  });
  res.send('Test mesajı gönderildi.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
