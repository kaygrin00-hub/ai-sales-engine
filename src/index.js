import dotenv from "dotenv";
dotenv.config();

import { checkMail } from "./mail/mailReader.js";
import { sendNotification, bot } from "./telegram/bot.js";
import { saveTask, getTasks } from "./db/memory.js";

async function run() {
  console.log("🚀 AI SALES ENGINE STARTED");
  
  // Telegram commands
  bot.onText(/\/tasks/, (msg) => {
    const tasks = getTasks();
    if (tasks.length === 0) {
      bot.sendMessage(msg.chat.id, "📋 Нет задач");
      return;
    }
    let text = "📋 ЗАДАЧИ:\n\n";
    tasks.forEach((t, i) => {
      text += `${i + 1}. ${t.task}\n`;
      text += `   Клиент: ${t.client}\n`;
      text += `   Приоритет: ${t.priority}\n\n`;
    });
    bot.sendMessage(msg.chat.id, text);
  });

  bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ AI Sales Engine работает");
  });

  // Mail check loop
  setInterval(async () => {
    try {
      const result = await checkMail();
      if (!result) return;
      
      saveTask(result);
      sendNotification(
        `📧 Новая задача\n\n` +
        `Клиент: ${result.client}\n` +
        `Задача: ${result.task}\n` +
        `Приоритет: ${result.priority}`
      );
    } catch (err) {
      console.error("❌ Mail check error:", err);
    }
  }, process.env.CHECK_INTERVAL || 60000);
}

run();
