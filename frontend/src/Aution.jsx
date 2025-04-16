import "./Aution.css"
import Sidebar from "./components/user/Sidebar"
import Navbar from "./components/user/Navbar"
import { Outlet } from "react-router-dom"

export default function Aution() {
  return (
    <div className="auction-page">
      <Navbar/>
      <div className="main-container">
        <Sidebar/>
        <Outlet />
      </div>
    </div>
  )
}

