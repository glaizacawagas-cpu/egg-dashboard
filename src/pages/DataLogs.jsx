export default function DataLogs({ telemetry }) {
    return (
      <>
        <h1>Data Logs</h1>
  
        <div className="table-container">
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
      </>
    );
  }
  