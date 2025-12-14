import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* ======================
   MAIN APP
====================== */
export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/controller" element={<Controller />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/logs" element={<DataLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

/* ======================
   SIDEBAR
====================== */
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Egg Incubator</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <span>📊</span> Dashboard
        </NavLink>
        <NavLink to="/controller" className="sidebar-link">
          <span>🎛</span> Controller
        </NavLink>
        <NavLink to="/scheduler" className="sidebar-link">
          <span>⏱</span> Scheduler
        </NavLink>
        <NavLink to="/logs" className="sidebar-link">
          <span>🗂</span> Data Logs
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          <span>⚙</span> Settings
        </NavLink>
      </nav>
    </aside>
  );
}

/* ======================
   DASHBOARD
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
      <h1 className="dashboard-title">IoT Egg Monitoring Dashboard</h1>

      <div className="card-grid">
        <StatCard label="Temperature" value={`${latest.temp ?? "--"} °C`} className="temp" />
        <StatCard label="Humidity" value={`${latest.humidity ?? "--"} %`} className="humidity" />
        <StatCard label="Turner" value={latest.turner ? "ON" : "OFF"} className="turner" />
      </div>

      <div className="chart-container">
        <h2>Temperature & Humidity</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={telemetry}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line dataKey="temp" />
            <Line dataKey="humidity" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ======================
   CONTROLLER (CONNECTED)
====================== */
function Controller() {
  const [temp, setTemp] = useState(37.5);
  const [humidity, setHumidity] = useState(60);
  const [autoTurn, setAutoTurn] = useState(true);
  const [fanAuto, setFanAuto] = useState(true);

  const sendController = (payload) => {
    fetch("/api/controller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(console.error);
  };

  return (
    <div className="page">
      <h1>Controller</h1>

      <div className="card-grid">

        {/* TEMPERATURE */}
        <div className="stat-card">
          <p className="stat-label">Temperature Control</p>

          <input
            type="range"
            min="35"
            max="40"
            step="0.1"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />

          <div className="info-row">
            <span>Current:</span>
            <span>{temp} °C</span>
          </div>

          <div className="info-row">
            <span>Range:</span>
            <span>35–40 °C</span>
          </div>

          <button
            className="apply-btn apply-temp"
            onClick={() => sendController({ temperature: temp })}
          >
            Apply Settings
          </button>
        </div>

        {/* HUMIDITY */}
        <div className="stat-card">
          <p className="stat-label">Humidity Control</p>

          <input
            type="range"
            min="40"
            max="80"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />

          <div className="info-row">
            <span>Current:</span>
            <span>{humidity} %</span>
          </div>

          <div className="info-row">
            <span>Range:</span>
            <span>40–80 %</span>
          </div>

          <button
            className="apply-btn apply-humidity"
            onClick={() => sendController({ humidity })}
          >
            Apply Settings
          </button>
        </div>

        {/* EGG TURNER */}
        <div className="stat-card">
          <p className="stat-label">Egg Turner Control</p>

          <button
            className="manual-turn-btn"
            onClick={() => sendController({ manualTurn: true })}
          >
            Manual Turn
          </button>

          <div className="toggle-row">
            <span>Auto Turn Mode</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={autoTurn}
                onChange={() => {
                  setAutoTurn(!autoTurn);
                  sendController({ autoTurn: !autoTurn });
                }}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="info-row"><span>Last Turn:</span><span>10:00 AM</span></div>
          <div className="info-row"><span>Next Turn:</span><span>12:00 PM</span></div>
          <div className="info-row"><span>Turn Interval:</span><span>2 hours</span></div>
        </div>

        {/* FAN */}
        <div className="stat-card">
          <p className="stat-label">Fan Control</p>

          <div className="toggle-row">
            <span>Auto Mode</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={fanAuto}
                onChange={() => {
                  setFanAuto(!fanAuto);
                  sendController({ fanAuto: !fanAuto });
                }}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="info-row"><span>Current Speed:</span><span>{fanAuto ? "Auto" : "Manual"}</span></div>
          <div className="info-row"><span>Status:</span><span style={{ color: "#16a34a" }}>Running</span></div>
          <div className="info-row"><span>Runtime Today:</span><span>8.5 hrs</span></div>
        </div>

      </div>
    </div>
  );
}

/* ======================
   OTHER PAGES
====================== */
const Scheduler = () => <div className="page"><h1>Scheduler</h1></div>;
const DataLogs = () => <div className="page"><h1>Data Logs</h1></div>;
const Settings = () => <div className="page"><h1>Settings</h1></div>;

/* ======================
   STAT CARD
====================== */
function StatCard({ label, value, className }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${className}`}>{value}</p>
    </div>
  );
}
