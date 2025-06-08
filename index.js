const express = require('express'); const axios = require('axios'); require('dotenv').config();

const app = express(); const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test endpoint app.get('/', async (req, res) => { const message = '🔔 RABBIT PANEL - TEST MESAJI'; const url = https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage; await axios.post(url, { chat_id: process.env.CHAT_ID, text: message, }); res.send('Test mesajı gönderildi.'); });

// Webhook endpoint app.post('/webhook', async (req, res) => { const { coin, fiyat, uyari_turu, adet, hedef_fiyat } = req.body;

if (!coin || !fiyat || !uyari_turu || !adet || !hedef_fiyat) { return res.status(400).send('Eksik veri!'); }

let message = '';

switch (uyari_turu.toUpperCase()) { case 'ALIM FIRSATI': message = 🧨 ALIM FIRSATI: ${coin}\n💵 Mevcut Fiyat: ${fiyat} USDT\n🎯 Hedef Fiyat: ${hedef_fiyat} USDT\n📦 Adet: ${adet}; break; case 'SATIŞ UYARISI': message = 🚨 SATIŞ UYARISI: ${coin}\n💰 Mevcut Fiyat: ${fiyat} USDT\n📉 Hedef Fiyat: ${hedef_fiyat} USDT\n📦 Adet: ${adet}; break; case 'STOP LOSS': message = 📉 STOP LOSS: ${coin}\n⚠️ Fiyat: ${fiyat} USDT\n🎯 Hedef Fiyat: ${hedef_fiyat} USDT\n📦 Adet: ${adet}; break; default: message = 🔔 ${uyari_turu}: ${coin}\nFiyat: ${fiyat} USDT\nHedef: ${hedef_fiyat} USDT\nAdet: ${adet}; }

const url = https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage; try { await axios.post(url, { chat_id: process.env.CHAT_ID, text: message, }); res.send('Mesaj gönderildi.'); } catch (error) { console.error('Telegram gönderim hatası:', error.response ? error.response.data : error.message); res.status(500).send('Mesaj gönderilemedi.'); } });

app.listen(PORT, () => { console.log(Server is running on port ${PORT}); });
