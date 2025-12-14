import {
  Thermometer,
  Droplets,
  Wifi
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../App.css";

const tempData = [
  { time: "09:00", value: 37.1 },
  { time: "09:15", value: 37.2 },
  { time: "09:30", value: 37.3 },
  { time: "09:45", value: 37.2 },
  { time: "10:00", value: 37.2 }
];

const humidityData = [
  { time: "09:00", value: 54 },
  { time: "09:15", value: 55 },
  { time: "09:30", value: 56 },
  { time: "09:45", value: 55 },
  { time: "10:00", value: 55 }
];

export default function Dashboard() {
  return (
    <div className="main-content">
      <h1 className="dashboard-title">IoT Egg Incubator Dashboard</h1>

      {/* ===== TOP STATUS CARDS ===== */}
      <div className="card-grid">
        <div className="stat-card">
          <div className="stat-header">
            <Thermometer className="stat-icon" />
            <span>Temperature</span>
          </div>
          <div className="stat-value">37.2°C</div>
          <div className="stat-sub">Logged every 15 minutes</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Droplets className="stat-icon" />
            <span>Humidity</span>
          </div>
          <div className="stat-value">55%</div>
          <div className="stat-sub">Logged every 15 minutes</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Wifi className="stat-icon" />
            <span>Device Status</span>
          </div>
          <div className="stat-value status-green">Online</div>
          <div className="stat-sub">Last sync: 09:00</div>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="card-grid">
        {/* TEMPERATURE CHART */}
        <div className="stat-card">
          <h3>Temperature (15-min Interval)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={tempData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[35, 40]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* HUMIDITY CHART */}
        <div className="stat-card">
          <h3>Humidity (15-min Interval)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={humidityData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[40, 70]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
