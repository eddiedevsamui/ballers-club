export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Check if the user sent the /start command
    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const firstName = message.from.first_name || "Baller";
      
      const welcomeText = `Welcome, ${firstName}! 🥂\n\nKoh Samui's Premier Russian Strip Club awaits.\nTap the button below to book your VIP table or private event.`;
      
      // Send message back to Telegram
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: welcomeText,
          reply_markup: {
            inline_keyboard: [[
              // Replace URL with your actual Vercel App URL
              { text: "💎 Open Ballers Club App", web_app: { url: process.env.WEBAPP_URL } }
            ]]
          }
        })
      });
    }
  }
  res.status(200).send('OK');
}
