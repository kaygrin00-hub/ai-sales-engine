// AmoCRM Integration (заготовка)

export async function createDeal(data) {
  if (!process.env.AMOCRM_TOKEN || !process.env.AMOCRM_DOMAIN) {
    console.log("⚠️ AmoCRM not configured yet");
    return null;
  }

  console.log("💼 CREATE DEAL:", data);
  
  // TODO: Implement real AmoCRM API integration
  // const response = await fetch(`https://${process.env.AMOCRM_DOMAIN}/api/v4/leads`, {
  //   method: "POST",
  //   headers: {
  //     "Authorization": `Bearer ${process.env.AMOCRM_TOKEN}`,
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     name: data.client,
  //     price: data.deal_amount,
  //     responsible_user_id: 1
  //   })
  // });
}

export async function updateDeal(dealId, data) {
  console.log("💼 UPDATE DEAL:", dealId, data);
}
