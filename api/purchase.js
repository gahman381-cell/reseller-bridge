
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `${process.env.WORKER_URL}/api/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-panel-secret": process.env.PANEL_API_SECRET
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch {
    return res.status(502).json({
      error: "Purchase connection failed"
    });
  }
}
