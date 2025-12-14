import { useEffect, useState } from "react";

export default function Controller() {
  const [temperature, setTemperature] = useState(37.5);
  const [humidity, setHumidity] = useState(60);

  useEffect(() => {
    fetch("/api/controller")
      .then(res => res.json())
      .then(data => {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      });
  }, []);

  const applySettings = () => {
    fetch("/api/controller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ temperature, humidity })
    });
  };

  return (
    <>
      <h1>Controller</h1>

      <div className="card-grid">
        <div className="stat-card">
          <p>Target Temperature: {temperature} °C</p>
          <input
            type="range"
            min="35"
            max="40"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>

        <div className="stat-card">
          <p>Target Humidity: {humidity}%</p>
          <input
            type="range"
            min="40"
            max="80"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>
      </div>

      <button className="btn-on" onClick={applySettings}>
        Apply Settings
      </button>
    </>
  );
}
