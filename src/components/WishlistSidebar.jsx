// components/WishlistSidebar.jsx
import { useWishlist } from "../context/WishlistContext";

const WishlistSidebar = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Wishlist ({wishlist.length})</h2>
        {/* List wishlist items */}
        {wishlist.map(item => (
          <div key={item.id} className="flex gap-4 py-4 border-b">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <button onClick={() => removeFromWishlist(item.id)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};