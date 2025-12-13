import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    fetch("/api/telemetry")
      .then((res) => res.json())
      .then((data) => setTelemetry(data))
      .catch(() => setTelemetry([]));
  }, []);

  const latest = telemetry.at(-1) || {};

  return (
    <div className="app-container">
      <h1 className="dashboard-title">IoT Egg Monitoring Dashboard</h1>

      {/* STAT CARDS */}
      <div className="card-grid">
        <div className="stat-card">
          <p className="stat-label">Temperature</p>
          <p className="stat-value temp">
            {latest.temp ?? "--"} °C
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Humidity</p>
          <p className="stat-value humidity">
            {latest.humidity ?? "--"} %
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Turner</p>
          <p className="stat-value turner">
            {latest.turner ? "ON" : "OFF"}
          </p>
        </div>
      </div>

      {/* TELEMETRY TABLE */}
      <div className="table-container">
        <h2 className="table-title">Telemetry Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Turner</th>
            </tr>
          </thead>
          <tbody>
            {telemetry.map((t, i) => (
              <tr key={i}>
                <td>{t.time}</td>
                <td>{t.temp}</td>
                <td>{t.humidity}</td>
                <td>{t.turner ? "ON" : "OFF"}</td>
              </tr>
            ))}
            {!telemetry.length && (
              <tr>
                <td colSpan="4">No telemetry data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
