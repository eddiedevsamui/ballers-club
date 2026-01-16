export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, date, time, guests, phone, notes, service } = req.body;

  // 1. Create the message text with the new Time field
  const messageText = `
🔔 *NEW VIP BOOKING* 🔔

👤 *Guest:* ${name}
📅 *Date:* ${date}
⏰ *Time:* ${time}
👥 *Guests:* ${guests}
💎 *Service:* ${service}
📱 *Contact:* ${phone}
📝 *Notes:* ${notes || "None"}
  `.trim();

  try {
    // 2. Send to LINE Messaging API
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: process.env.LINE_ADMIN_ID,
        messages: [{ type: 'text', text: messageText }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('LINE API Error:', errorData);
      throw new Error('Failed to send to LINE');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}