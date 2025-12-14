export default function Sidebar({ active, setActive }) {
    const items = ["Dashboard", "Controller", "Scheduler", "Data Logs", "Settings"];
  
    return (
      <aside className="sidebar">
        <h2 className="sidebar-title">Egg Monitor</h2>
  
        {items.map((item) => (
          <button
            key={item}
            className={`sidebar-item ${active === item ? "active" : ""}`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </aside>
    );
  }
  