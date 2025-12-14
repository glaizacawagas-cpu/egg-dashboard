let controller = {
    temperature: 37.5,
    humidity: 60,
    autoTurn: true,
    fanAuto: true
  };
  
  export default function handler(req, res) {
    if (req.method === "POST") {
      controller = { ...controller, ...req.body };
      console.log("Controller updated:", controller);
      return res.status(200).json({ success: true });
    }
  
    if (req.method === "GET") {
      return res.status(200).json(controller);
    }
  
    res.status(405).json({ error: "Method not allowed" });
  }
  