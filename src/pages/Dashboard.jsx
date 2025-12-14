export default function Dashboard({ telemetry, turner }) {
    const latest = telemetry.at(-1) || {};
  
    return (
      <>
        <h1 className="dashboard-title">Dashboard</h1>
  
        <div className="card-grid">
          <div className="stat-card">
            <p className="stat-label">Temperature</p>
            <p className="stat-value temp">{latest.temp ?? "--"} °C</p>
          </div>
  
          <div className="stat-card">
            <p className="stat-label">Humidity</p>
            <p className="stat-value humidity">{latest.humidity ?? "--"}%</p>
          </div>
  
          <div className="stat-card">
            <p className="stat-label">Turner</p>
            <p className="stat-value turner">{turner ? "ON" : "OFF"}</p>
          </div>
        </div>
      </>
    );
  }
  