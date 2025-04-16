import "./Aution.css"
import Sidebar from "./components/user/Sidebar"

import { Outlet } from "react-router-dom"
import AdminNavbar from "./components/admin/AdminNavbar"
import AdminSidebar from "./components/admin/AdminSidebar"

export default function AdminAuction() {
  return (
    <div className="auction-page">
      <AdminNavbar/>
      <div className="main-container">
        <AdminSidebar/>
        <Outlet />
      </div>
    </div>
  )
}

