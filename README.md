# 🚀 AI SALES ENGINE

Deploy-ready проект для Railway: Mail.ru + Telegram + AI + база задач

## 🎯 Возможности

✅ Читает письма с Mail.ru (IMAP)  
✅ AI анализирует письма (OpenAI GPT-4)  
✅ Извлекает задачи, клиентов, дедлайны  
✅ Отправляет уведомления в Telegram  
✅ Сохраняет задачи в памяти  
✅ Готово к интеграции с AmoCRM  

## 📦 Установка

### Локально

```bash
git clone https://github.com/kaygrin00-hub/ai-sales-engine.git
cd ai-sales-engine

npm install

cp .env.example .env
# Заполни .env своими данными

npm start
```

### На Railway

1. Форк этого репо
2. Перейди на [railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Выбери `ai-sales-engine`
5. Добавь переменные окружения (см. ниже)
6. Нажми Deploy

## ⚙️ Переменные окружения

```env
# Mail.ru
EMAIL_USER=your-email@mail.ru
EMAIL_PASS=your-app-password
EMAIL_HOST=imap.mail.ru

# OpenAI
OPENAI_API_KEY=sk-...

# Telegram
TELEGRAM_BOT_TOKEN=...
ADMIN_CHAT_ID=...

# AmoCRM (опционально)
AMOCRM_TOKEN=
AMOCRM_DOMAIN=

# Scheduler
CHECK_INTERVAL=60000
```

### Ка�� получить токены?

**Mail.ru:**
- Включи двухфакторную аутентификацию
- Создай пароль приложения в настройках безопасности

**Telegram:**
- Напиши @BotFather
- `/newbot` → получи `TELEGRAM_BOT_TOKEN`
- Напиши своему боту `/start`
- Получи `ADMIN_CHAT_ID` через `/start` (будет в логах бота)

**OpenAI:**
- [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Создай новый API ключ

## 📋 Telegram команды

```
/tasks   - Показать все задачи
/status  - Статус системы
```

## 📁 Структура проекта

```
src/
 ├── index.js            # Главный файл
 ├── mail/mailReader.js  # Чтение писем
 ├── ai/analyzer.js      # AI анализ
 ├── telegram/bot.js     # Telegram интеграция
 ├── crm/amocrm.js       # AmoCRM заготовка
 └── db/memory.js        # База задач
```

## 🔥 Следующий уровень

Можно добавить:
- 🔥 Telegram MTProto (полный доступ к чатам)
- 🔥 Настоящий AmoCRM sync
- 🔥 AI "память клиента"
- 🔥 Дедлайны + автозадачи
- 🔥 Dashboard (как HubSpot)

## 📝 Лицензия

MIT
