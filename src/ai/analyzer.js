import fetch from "node-fetch";

export async function analyzeEmail(text) {
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-2",
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
      console.error("❌ Grok API error:", res.status);
      const error = await res.text();
      console.error("Error details:", error);
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
