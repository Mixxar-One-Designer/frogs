const { Telegraf } = require("telegraf");
const TOKEN = "7226180214:AAFM1YztC7-Edwm63N94Mi22TEzzjzYrLeU";
const bot = new Telegraf(TOKEN);
const express = require("express");
const app = express();
app.use(express.json());

const web_link = "https://frogs-nu.vercel.app/";
const community_link = "https://t.me/frogs_world";
const image_url = "https://i.ibb.co/YbKjmHN/frogs.jpg"; // Updated with direct image URL

bot.start((ctx) => {
    const startPayload = ctx.startPayload;
    const urlSent = `${web_link}?ref=${startPayload}`;
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;

    // Send a single message with the image and text
    ctx.replyWithPhoto(image_url, {
        caption: `*Hey ${userName}, welcome to the Frogs Bot!* 🐸\n\nStart mining and collect $FROGS tokens as you dig deeper! Every tap brings you closer to becoming the top frog in the pond.\n\nInvite friends and climb the leaderboard together. More frogs, more fun, and more rewards!`,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "👋 Start Mining!", web_app: { url: urlSent } }],
                [{ text: "Join our Community", url: community_link }]
            ],
        }
    });
});

bot.launch();

app.listen(3005, () => {
    console.log("Server is now running");
});