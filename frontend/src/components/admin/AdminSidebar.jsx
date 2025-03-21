import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-nav">
        <a href="/admin" className="nav-item active">
          <span className="icon">🏠</span> <span>Dashboard</span>
        </a>
        <a href="/admin/products/pending" className="nav-item">
          <span className="icon">📦</span> <span>Pending Products</span>
        </a>
        <a href="/admin/products/approved" className="nav-item">
          <span className="icon">🛒</span> <span>Approved Products</span>
        </a>
        <a href="/admin/auctions" className="nav-item">
          <span className="icon">🔨</span> <span>Active Auctions</span>
        </a>
        <a href="/admin/users" className="nav-item">
          <span className="icon">👤</span> <span>Users</span>
        </a>
        <a href="/admin/analytics" className="nav-item">
          <span className="icon">📊</span> <span>Analytics</span>
        </a>
        <a href="/admin/settings" className="nav-item">
          <span className="icon">⚙️</span> <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
}
