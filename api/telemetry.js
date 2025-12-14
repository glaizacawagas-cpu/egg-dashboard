export default function handler(req, res) {
    res.status(200).json([
      { time: "10:00", temp: 37.5, humidity: 60, turner: true },
      { time: "10:05", temp: 37.6, humidity: 61, turner: false },
      { time: "10:10", temp: 37.7, humidity: 62, turner: true }
    ]);
  }
  