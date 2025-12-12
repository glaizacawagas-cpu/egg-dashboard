const express = require("express");
const app = express();

app.get("/api/status", (req, res) => {
  res.json({
    temperature: 37.5,
    humidity: 60,
    eggs: "OK"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
