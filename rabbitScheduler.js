const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

// Örnek veri (buraya ileride veritabanından veya analizden gelen veriler eklenecek)
function getDailyStockMessage() {
  return `
📈 RABBIT PANEL - GÜNLÜK TAVSİYE

🐰 Tavşan Stratejisi’ne uygun hisseler:
- $HTKM — 23,40 TL (Destek: 22,80)
- $JANTS — 179,50 TL (Kırılım: 180,20)
- $AGROT — 5,13 TL (Yükseliş emaresi)

🕘 Saat 09:00 itibarıyla sistem tarafından otomatik gönderilmiştir.
`.trim();
}

// Her gün 09:00’da çalışacak cron-job
cron.schedule('0 9 * * *', async () => {
  const message = getDailyStockMessage();
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: message
    });
    console.log('📤 Günlük hisse mesajı gönderildi.');
  } catch (err) {
    console.error('🚨 Telegram gönderim hatası:', err.response?.data || err.message);
  }
});
