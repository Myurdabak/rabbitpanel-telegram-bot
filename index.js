const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const message = '🔔 RABBIT PANEL - TEST MESAJI';
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: message
    });
    res.send('Test mesajı gönderildi.');
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    res.status(500).send('Hata oluştu.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
