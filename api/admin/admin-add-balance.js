
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.headers["x-panel-secret"] !== process.env.PANEL_API_SECRET) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  try {
    const response = await fetch(
      `${process.env.WORKER_URL}/api/admin/add-balance`,
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
    return res.status(502).json({ error: "Connection failed" });
  }
}
