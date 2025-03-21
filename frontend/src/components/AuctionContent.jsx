import { Search } from "lucide-react"
import "./temp.css"


export default function AuctionContent() {
  const auctionItems = [
    { image: "/images.jpg", label: "Item 1", title: "Antique Vase", price: "$120" },
    { image: "/images1.jpg", label: "Item 2", title: "Vintage Watch", price: "$250" },
    { image: "/images2.jpg", label: "Item 3", title: "Painting", price: "$300" },
    { image: "/placeholder.svg?height=200&width=200", label: "Item 4", title: "Wooden Chair", price: "$80" },
    { image: "/placeholder.svg?height=200&width=200", label: "Item 5", title: "Handmade Jewelry", price: "$50" },
    { image: "/placeholder.svg?height=200&width=200", label: "Item 6", title: "Classic Car Model", price: "$150" },
  ];

  return (
    <main className="content">
      <div className="search-container">
        <div className="search-wrapper">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-btn">
            <Search size={20} />
          </button>
        </div>
        <div className="filters">
          <button className="filter-btn active">New</button>
          <button className="filter-btn">Price ascending</button>
          <button className="filter-btn">Price descending</button>
          <button className="filter-btn">Rating</button>
        </div>
      </div>

      <div className="auction-container">
        {auctionItems.map((item, index) => (
          <div key={index} className="auction-card">
            <div className="auction-label">{item.label}</div>
            <div className="image-container">
              <img src={item.image || "/placeholder.svg"} alt={item.title} />
            </div>
            <div className="card-content">
              <p className="item-title">{item.title}</p>
              <p className="item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
