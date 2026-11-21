
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-panel-secret"] !== process.env.PANEL_API_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const plans = {
    day: "1",
    week: "7",
    month: "30",
    lifetime: "1000"
  };

  const expiry = plans[req.body.plan];

  if (!expiry) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  try {
    const params = new URLSearchParams({
      sellerkey: process.env.KEYAUTH_SELLER_KEY,
      type: "add",
      format: "json",
      expiry,
      mask: "****-****-****",
      amount: "1"
    });

    const response = await fetch(
      `https://keyauth.win/api/seller/?${params}`
    );

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ error: data.message || "KeyAuth failed" });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: "KeyAuth connection failed" });
  }
}
