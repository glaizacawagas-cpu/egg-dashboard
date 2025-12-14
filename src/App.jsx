import { useEffect, useState } from "react";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

export default function App() {
  const [telemetry, setTelemetry] = useState([]);
  const [turner, setTurner] = useState(false);

const fetchTelemetry = () => {
fetch("/api/telemetry")
.then((res) => res.json())
.then((data) => {
setTelemetry(data);
setTurner(data.at(-1)?.turner ?? false);
});
};


useEffect(() => {
fetchTelemetry();
const interval = setInterval(fetchTelemetry, 5000);
return () => clearInterval(interval);
}, []);


const latest = telemetry.at(-1) || {};


return (
<div className="app-container">
<h1 className="dashboard-title">IoT Egg Monitoring Dashboard</h1>


{/* STATUS CARDS */}
<div className="card-grid">
<StatCard label="Temperature" value={`${latest.temp ?? "--"} °C`} className="temp" />
<StatCard label="Humidity" value={`${latest.humidity ?? "--"} %`} className="humidity" />
<StatCard label="Turner" value={turner ? "ON" : "OFF"} className="turner" />
</div>


{/* CHART */}
<div className="chart-container">
<h2>Temperature & Humidity</h2>
<ResponsiveContainer width="100%" height={260}>
<LineChart data={telemetry}>
<XAxis dataKey="time" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="temp" />
<Line type="monotone" dataKey="humidity" />
</LineChart>
</ResponsiveContainer>
</div>


{/* TURNER CONTROL */}
<div className="turner-control">
<button
className={turner ? "btn-on" : "btn-off"}
onClick={() => setTurner(!turner)}
>
TURNER {turner ? "ON" : "OFF"}
</button>
</div>


{/* TELEMETRY TABLE */}
<div className="table-container">
<h2 className="table-title">Telemetry Logs</h2>
<table>
<thead>
<tr>
<th>Time</th>
<th>Temp</th>
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
</tbody>
</table>
</div>
</div>
);
}


function StatCard({ label, value, className }) {
return (
<div className="stat-card">
<p className="stat-label">{label}</p>
<p className={`stat-value ${className}`}>{value}</p>
</div>
);
}