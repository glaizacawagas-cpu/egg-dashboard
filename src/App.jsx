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

/* ======================
   MAIN APP (NO SIDEBAR)
====================== */
export default function App() {
  return (
    <main className="main-content">
      <Dashboard />
    </main>
  );
}

/* ======================
   DASHBOARD (ALL-IN-ONE)
====================== */
function Dashboard() {
  const [telemetry, setTelemetry] = useState([]);

  const fetchTelemetry = () => {
    fetch("/api/telemetry")
      .then(res => res.json())
      .then(setTelemetry)
      .catch(console.error);
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

      {/* ===== TOP STATUS CARDS ===== */}
      <div className="card-grid">
        <StatCard
          label="🌡 Temperature"
          value={`${latest.temp ?? "--"}°C`}
          sub="Logged every 15 minutes"
          className="temp"
        />
        <StatCard
          label="💧 Humidity"
          value={`${latest.humidity ?? "--"}%`}
          sub="Logged every 15 minutes"
          className="humidity"
        />
        <StatCard
          label="🛜 Device Status"
          value="Online"
          sub="Last sync: 09:00"
          className="status-green"
        />
      </div>

      {/* ===== SCHEDULERS ===== */}
      <div className="controller-grid two-cols">
        <FanScheduler />
        <EggTurnerScheduler />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="card-grid two-cols">
        <ChartCard
          title="Temperature (15-min Interval)"
          data={telemetry}
          dataKey="temp"
          color="#f97316"
          domain={[35, 40]}
        />
        <ChartCard
          title="Humidity (15-min Interval)"
          data={telemetry}
          dataKey="humidity"
          color="#3b82f6"
          domain={[40, 80]}
        />
      </div>
    </div>
  );
}

/* ======================
   FAN SCHEDULER
====================== */
function FanScheduler() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className={`control-card ${!enabled ? "disabled-card" : ""}`}>
      <h3>⏲ Fan Scheduler</h3>

      <div className="toggle-row">
        <span>Enable Schedule</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <input
        placeholder="Run duration (hours)"
        disabled={!enabled}
      />

      <input
        placeholder="Interval (hours)"
        disabled={!enabled}
      />

      <button
        className="apply-btn apply-temp"
        disabled={!enabled}
      >
        Load Saved Schedule
      </button>

      <p className="stat-label">Example: Run 1 hr every 3 hrs</p>
    </div>
  );
}


/* ======================
   EGG TURNER SCHEDULER
====================== */
function EggTurnerScheduler() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className={`control-card ${!enabled ? "disabled-card" : ""}`}>
      <h3>⟳ Egg Turner Scheduler</h3>

      <div className="toggle-row">
        <span>Enable Schedule</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <input
        placeholder="Turn duration (minutes)"
        disabled={!enabled}
      />

      <input
        placeholder="Interval (hours)"
        disabled={!enabled}
      />

      <button
        className="apply-btn apply-humidity"
        disabled={!enabled}
      >
        Load Saved Schedule
      </button>

      <p className="stat-label">Example: Turn every 4 hours</p>
    </div>
  );
}

/* ======================
   CHART CARD
====================== */
function ChartCard({ title, data, dataKey, color, domain }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={domain} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ======================
   STAT CARD
====================== */
function StatCard({ label, value, sub, className }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${className}`}>{value}</p>
      <p className="stat-sub">{sub}</p>
    </div>
  );
}
