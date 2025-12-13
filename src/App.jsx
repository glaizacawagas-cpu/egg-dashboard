import { useEffect, useState } from "react";

export default function App() {
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    fetch("/api/telemetry")
      .then((res) => res.json())
      .then((data) => setTelemetry(data))
      .catch(() => setTelemetry([]));
  }, []);

  const latest = telemetry.length ? telemetry[telemetry.length - 1] : {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          IoT Egg Monitoring Dashboard
        </h1>
        <p className="text-gray-500">
          Real‑time incubator environment status
        </p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-4xl font-bold text-orange-500">
            {latest.temp ?? "--"}°C
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-4xl font-bold text-blue-500">
            {latest.humidity ?? "--"}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Turner Status</p>
          <p className="text-2xl font-semibold text-green-600">
            {latest.turner ? "ON" : "OFF"}
          </p>
        </div>
      </div>

      {/* Telemetry Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Telemetry Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Time</th>
                <th className="py-2">Temp (°C)</th>
                <th className="py-2">Humidity (%)</th>
                <th className="py-2">Turner</th>
              </tr>
            </thead>
            <tbody>
              {telemetry.map((t, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-2">{t.time}</td>
                  <td className="py-2">{t.temp}</td>
                  <td className="py-2">{t.humidity}</td>
                  <td className="py-2">
                    {t.turner ? "ON" : "OFF"}
                  </td>
                </tr>
              ))}
              {!telemetry.length && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
