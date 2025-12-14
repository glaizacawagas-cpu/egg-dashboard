let status = {
    system: "ONLINE",
    incubator: "ACTIVE"
  };
  
  export default function handler(req, res) {
    if (req.method === "POST") {
      status = { ...status, ...req.body };
      return res.status(200).json({ success: true });
    }
    res.status(200).json(status);
  }
  