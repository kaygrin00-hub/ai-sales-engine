import TelegramBot from "node-telegram-bot-api";

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

export function sendNotification(text) {
  if (!process.env.ADMIN_CHAT_ID) {
    console.warn("⚠️ ADMIN_CHAT_ID not set");
    return;
  }
  bot.sendMessage(process.env.ADMIN_CHAT_ID, text).catch(err => {
    console.error("❌ Telegram send error:", err);
  });
}

console.log("✅ Telegram Bot initialized");
