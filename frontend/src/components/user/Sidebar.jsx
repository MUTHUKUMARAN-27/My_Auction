import { NavLink } from "react-router-dom";
import { Home, Gavel, ClipboardList, ShoppingCart, Tag } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-nav">
        <NavLink to="/autions" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/autions/myauction" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Gavel size={20} />
          <span>My Auctions</span>
        </NavLink>
        <NavLink to="/autions/my-won-items" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <ClipboardList size={20} />
          <span>Buy Now</span>
        </NavLink>
        <NavLink to="/autions/my-won" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <ShoppingCart size={20} />
          <span>My Won</span>
        </NavLink>
        <NavLink to="/autions/sell" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Tag size={20} />
          <span>Sell</span>
        </NavLink>
      </nav>
    </aside>
  );
}
