
export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const workerUrl = process.env.WORKER_URL;
    if (!workerUrl) {
      return res.status(500).json({ error: "Worker URL is not configured" });
    }

    const options = {
      method: req.method,
      headers: {
        "Authorization": req.headers.authorization || "",
        "Content-Type": "application/json"
      }
    };

    if (req.method === "POST") {
      options.body = JSON.stringify(req.body || {});
    }

    const response = await fetch(
      `${workerUrl}/v1/products/mappings`.replace(
        "/v1/products/mappings",
        req.method === "GET" ? "/v1/products" : "/v1/products/mappings"
      ),
      options
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(502).json({
      error: "Could not connect to the delivery server"
    });
  }
}
