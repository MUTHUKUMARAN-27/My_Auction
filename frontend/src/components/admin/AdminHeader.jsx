import "./AdminHeader.css"

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="logo">ActionMaster</div>
      <nav>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <div className="user-icon">👤</div>
      </nav>
    </header>
  )
}

