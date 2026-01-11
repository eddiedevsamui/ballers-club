export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, date, guests, phone, notes, service } = req.body;

  // Format the message for LINE
  const message = `
🔔 *NEW VIP BOOKING* 🔔

👤 *Guest:* ${name}
📅 *Date:* ${date}
👥 *Guests:* ${guests}
💎 *Service:* ${service}
📱 *Contact:* ${phone}
📝 *Notes:* ${notes || "None"}
  `;

  try {
    // We use LINE Messaging API (Push Message)
    // Make sure to add LINE_CHANNEL_ACCESS_TOKEN and LINE_ADMIN_ID to Vercel Environment Variables
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: process.env.LINE_ADMIN_ID,
        messages: [{ type: 'text', text: message }]
      }),
    });

    if (!response.ok) {
      throw new Error('LINE API Error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}