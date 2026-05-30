import { useState } from "react";
import { Link } from "react-router";
import Stars from "./Stars";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      to={`/product-details/${product.id}`}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden
      transition-all duration-300 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative bg-[#F7F9FB] flex items-center justify-center py-6 px-4 h-52">
        <span
          className={`absolute top-0 left-3 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-bl-lg rounded-br-lg ${product.badgeColor}`}
        >
          {product.badge}
        </span>
        {/* Favorite icon disabled for now */}

        {/* <img
          src={product.images[0]}
          alt={product.name}
          className="h-52 object-contain transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/200x200/f3f4f6/94a3b8?text=Phone";
          }}
        /> */}
        <figure className="hover-gallery ">
          {product.images &&
            product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className="h-52 object-contain transition-transform duration-500"
              />
            ))}
        </figure>
      </div>

      {/* Info */}
      <div className="px-4 pt-3 pb-4 info-hover">
        <div className="flex items-center gap-1.5 mb-1">
          <Stars rating={product.rating} />
          <span className="text-xs md:text-sm text-gray-400">
            ({product.reviews})
          </span>
        </div>
        <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
          {product.name}
        </h3>
        <p className="text-xs lg:text-sm text-[#767E97] mt-0.5 line-clamp-1">
          {product.storage} · {product.color}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg md:text-xl font-bold text-[#1C2337]">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className={`mt-3 w-full bg-custom active:scale-95 text-white py-2 rounded-lg text-sm cursor-pointer font-medium transition-all duration-300`}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
