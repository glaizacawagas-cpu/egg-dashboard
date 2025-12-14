let telemetry = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { temp, humidity } = req.body;
    telemetry.push({
      time: new Date().toLocaleTimeString(),
      temp,
      humidity
    });

    if (telemetry.length > 100) telemetry.shift();
    return res.status(200).json({ success: true });
  }

  res.status(200).json(telemetry);
}
