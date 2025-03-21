"use client"

import { useState } from "react"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"
import AdminContent from "./AdminContent"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("new")

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <main className="main-content">
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            <button className={activeFilter === "new" ? "active" : ""} onClick={() => setActiveFilter("new")}>
              New
            </button>
            <button
              className={activeFilter === "price-asc" ? "active" : ""}
              onClick={() => setActiveFilter("price-asc")}
            >
              Price ascending
            </button>
            <button
              className={activeFilter === "price-desc" ? "active" : ""}
              onClick={() => setActiveFilter("price-desc")}
            >
              Price descending
            </button>
            <button className={activeFilter === "rating" ? "active" : ""} onClick={() => setActiveFilter("rating")}>
              Rating
            </button>
          </div>
          <AdminContent searchQuery={searchQuery} activeFilter={activeFilter} />
        </main>
      </div>
    </div>
  )
}

