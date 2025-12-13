export default function handler(req, res) {
  res.status(200).json({
  system: "ONLINE",
  incubator: "ACTIVE"
  });
  }