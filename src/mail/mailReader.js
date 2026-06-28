import Imap from "imap-simple";
import { analyzeEmail } from "../ai/analyzer.js";

export async function checkMail() {
  try {
    const config = {
      imap: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
        host: process.env.EMAIL_HOST,
        port: 993,
        tls: true
      }
    };

    const connection = await Imap.connect(config);
    await connection.openBox("INBOX");
    
    const messages = await connection.search(["UNSEEN"], {
      bodies: "",
      markSeen: true
    });

    if (messages.length === 0) {
      console.log("📭 No new emails");
      await connection.end();
      return null;
    }

    console.log(`📬 Found ${messages.length} new messages`);

    for (const msg of messages) {
      const body = msg.parts.find(p => p.which === "TEXT")?.body || "";
      if (!body) continue;

      console.log("📧 Processing email...");
      const result = await analyzeEmail(body);
      await connection.end();
      return result;
    }

    await connection.end();
    return null;
  } catch (err) {
    console.error("❌ Mail reader error:", err);
    return null;
  }
}
