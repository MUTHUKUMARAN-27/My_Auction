import "./AdminContent.css"

const items = [
  { id: 1, title: "Antique Vase", image: "/placeholder.svg?height=400&width=400", price: 1200 },
  { id: 2, title: "Vintage Watch", image: "/placeholder.svg?height=400&width=400", price: 850 },
  { id: 3, title: "Painting", image: "/placeholder.svg?height=400&width=400", price: 2000 },
]

export default function AdminContent({ searchQuery, activeFilter }) {
  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (activeFilter === "price-asc") return a.price - b.price
    if (activeFilter === "price-desc") return b.price - a.price
    return 0
  })

  return (
    <div className="admin-content">
      {sortedItems.map((item) => (
        <div key={item.id} className="item-card">
          <img src={item.image || "/placeholder.svg"} alt={item.title} />
          <h3>{item.title}</h3>
          <p>Starting bid: ${item.price}</p>
          <div className="item-actions">
            <button className="approve">Approve</button>
            <button className="reject">Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}

