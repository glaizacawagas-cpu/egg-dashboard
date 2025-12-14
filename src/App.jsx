import { useEffect, useState } from "react";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function App() {
  return (
    <main className="main-content">
      <Dashboard />
    </main>
  );
}

function Dashboard() {
  const [telemetry, setTelemetry] = useState([]);
  const [fanEnabled, setFanEnabled] = useState(false);
  const [turnerEnabled, setTurnerEnabled] = useState(false);

  const fetchTelemetry = () => {
    fetch("/api/telemetry")
      .then(res => res.json())
      .then(setTelemetry)
      .catch(console.error);
  };

  const sendControl = (data) => {
    fetch("/api/controller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  };

  useEffect(() => {
    fetchTelemetry();
    const i = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(i);
  }, []);

  const latest = telemetry.at(-1) || {};

  return (
    <div className="app-container">
      <h1 className="dashboard-title">IoT Egg Incubator Dashboard</h1>

      <div className="card-grid">
        <StatCard label="🌡 Temperature" value={`${latest.temp ?? "--"}°C`} />
        <StatCard label="💧 Humidity" value={`${latest.humidity ?? "--"}%`} />
        <StatCard label="🛜 Device Status" value="Online" />
      </div>

      <div className="controller-grid two-cols">
        <Scheduler
          title="⏲ Fan Scheduler"
          enabled={fanEnabled}
          onToggle={(v) => {
            setFanEnabled(v);
            sendControl({ fanEnabled: v });
          }}
        />
        <Scheduler
          title="⟳ Egg Turner Scheduler"
          enabled={turnerEnabled}
          onToggle={(v) => {
            setTurnerEnabled(v);
            sendControl({ turnerEnabled: v });
          }}
        />
      </div>

      <div className="card-grid two-cols">
        <Chart title="Temperature" data={telemetry} keyName="temp" />
        <Chart title="Humidity" data={telemetry} keyName="humidity" />
      </div>
    </div>
  );
}

function Scheduler({ title, enabled, onToggle }) {
  return (
    <div className={`control-card ${!enabled ? "disabled-card" : ""}`}>
      <h3>{title}</h3>

      <div className="toggle-row">
        <span>Enable Schedule</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => onToggle(!enabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <input placeholder="Run duration" disabled={!enabled} />
      <input placeholder="Interval" disabled={!enabled} />
      <button disabled={!enabled} className="apply-btn apply-temp">
        Load Schedule
      </button>
    </div>
  );
}

function Chart({ title, data, keyName }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line dataKey={keyName} stroke="#16a34a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}
