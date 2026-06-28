import fetch from "node-fetch";

export async function analyzeEmail(text) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Ты AI ассистент продаж. Извлеки из письма:
- task (основная задача)
- deadline (дедлайн если есть)
- client (имя клиента)
- priority (low/medium/high)
- should_create_deal (true/false для CRM)

Ответь только JSON без пояснений.`
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    if (!res.ok) {
      console.error("❌ OpenAI API error:", res.status);
      return null;
    }

    const data = await res.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);
    
    console.log("🧠 AI ANALYZED:", result);
    return result;
  } catch (err) {
    console.error("❌ AI analyzer error:", err);
    return null;
  }
}
