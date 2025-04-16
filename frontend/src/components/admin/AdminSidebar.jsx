
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
export default function AdminSidebar(){
  return (
    <aside className="sidebar">
      <nav className="side-nav">
        <NavLink to="/admindashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <span className="icon">📦</span> <span>Pending Products</span>
        </NavLink>
        <NavLink to="/admindashboard/approvedproducts" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <span className="icon">🛒</span> <span>Approved Products</span>
        </NavLink>
        <NavLink to="/admindashboard/winners" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <span className="icon">🏆</span> <span>Winners</span>
        </NavLink>
        <NavLink to="/admindashboard/users" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <span className="icon">👤</span> <span>Users</span>
        </NavLink>
        <NavLink to="/admindashboard/transaction" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <span className="icon">💰</span><span>Transaction</span>
        </NavLink>
        <NavLink to="/admindashboard/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <span className="icon">⚙️</span><span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
