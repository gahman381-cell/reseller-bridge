export default async function handler(req, res) {
  const worker = process.env.WORKER_URL;
  const secret = process.env.PANEL_API_SECRET;

  const response = await fetch(
    `${worker}/api/balance?reseller_id=${encodeURIComponent(req.query.reseller_id)}`,
    { headers: { "x-panel-secret": secret } }
  );

  const data = await response.text();
  res.status(response.status).send(data);
}
