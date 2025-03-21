import { Home, Gavel, ClipboardList, ShoppingCart, Tag } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="side-nav">
        <a href="#home" className="nav-item">
          <Home size={20} />
          <span>home</span>
        </a>
        <a href="#auctions" className="nav-item active">
          <Gavel size={20} />
          <span>Auctions</span>
        </a>
        <a href="#orders" className="nav-item">
          <ClipboardList size={20} />
          <span>Orders</span>
        </a>
        <a href="#buy" className="nav-item">
          <ShoppingCart size={20} />
          <span>Buy Now</span>
        </a>
        <a href="#sell" className="nav-item">
          <Tag size={20} />
          <span>Sell</span>
        </a>
      </nav>
    </aside>
  )
}

