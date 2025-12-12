export default function handler(req, res) {
    return res.status(200).json({
      temperature: 37.5,
      humidity: 60,
      eggCount: 120,
      status: "OK",
      timestamp: Date.now()
    });
  }
  