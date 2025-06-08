const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

// Her sabah saat 09:00'da mesaj gönder
cron.schedule('0 9 * * *', async () => {
  const message = `🔔 Günaydın Mehmet! \nBugünün Rabbit Panel raporunu kontrol etmeyi unutma.`;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: message
    });
    console.log('🟢 Günlük mesaj başarıyla gönderildi.');
  } catch (error) {
    console.error('🔴 Günlük mesaj gönderim hatası:', error.response ? error.response.data : error.message);
  }
});
