
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `${process.env.WORKER_URL}/v1/store`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": req.headers.authorization || ""
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(502).json({
      error: "Could not connect to the Worker"
    });
  }
}
