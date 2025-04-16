import { User } from "lucide-react"

export default function AdminNavbar() {
  return (
    <nav className="navbar">
      <div className="logo">ActionMaster</div>
      <div className="nav-links">
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className="profile-btn">
          <User />
        </button>
      </div>
    </nav>
  )
}

