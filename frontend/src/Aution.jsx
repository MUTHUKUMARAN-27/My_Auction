import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import AuctionContent from "./components/AuctionContent"
import "./Aution.css"

export default function Aution() {
  return (
    <div className="auction-page">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <AuctionContent />
      </div>
    </div>
  )
}

