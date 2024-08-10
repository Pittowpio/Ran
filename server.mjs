import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3030;

const BOT_TOKEN = '6888154158:AAEnSu7IgqI_jgsVeTArKkKzrIPHLBUtQnM';
const CHAT_ID = '@randomchatschat';

app.use(express.static('public'));

app.get('/member-count', async (req, res) => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMembersCount?chat_id=${CHAT_ID}`);
        const data = await response.json();

        if (data.ok) {
            res.json({ count: data.result });
        } else {
            console.error('Telegram API Error:', data);
            res.status(500).json({ error: data.description || 'Failed to fetch member count' });
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const siteData = {
    promotions: [
        { title: "Summer Giveaway", description: "Win exciting prizes!", date: "August 15, 2024" },
        { title: "New Member Bonus", description: "Get 100 TRX for joining!", date: "August 20, 2024" }
    ],
    events: [
        { title: "Weekly Chat", description: "Join our weekly discussion!", date: "Every Friday" },
        { title: "Movie Night", description: "Watch movies together!", date: "Every Saturday" }
    ],
    admins: [
        { name: "Admin1", role: "Group Owner" },
        { name: "Admin2", role: "Moderator" },
        { name: "Admin3", role: "Support" }
    ],
    rules: [
        "Be respectful to others.",
        "No spamming or advertising.",
        "Follow the Telegram community guidelines."
    ]
};

app.get('/promotions', (req, res) => res.json(siteData.promotions));
app.get('/events', (req, res) => res.json(siteData.events));
app.get('/admins', (req, res) => res.json(siteData.admins));
app.get('/rules', (req, res) => res.json(siteData.rules));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
