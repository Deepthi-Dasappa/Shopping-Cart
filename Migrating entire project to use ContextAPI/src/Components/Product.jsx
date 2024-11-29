import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Product({ id, image, title, description, price }) {
  const cartContext = useContext(CartContext);
  return (
    <article className="product h-full bg-[#5f4e33] flex flex-col shadow-black shadow-lg rounded-lg">
      <img src={image} alt={title} className="w-[100%] rounded-t-lg" />
      <div className="product-content flex flex-col">
        <div className="mb-5">
          <h3 className="text-[#fbd392] text-base font-semibold ml-3 mt-2">
            {title}
          </h3>
          <p className="text-sm text-[#d1b68b] ml-3 mt-1">${price}</p>
          <p className="h-28 text-xs mx-4 my-3 text-justify">{description}</p>
        </div>
        <p className="text-right mb-3 pr-5">
          <button
            className="bg-[#f4b115] rounded-md text-[#201e1a] text-xs hover:bg-[#f5b744] p-1"
            onClick={() => cartContext.onAddToCart(id)}
          >
            Add to cart
          </button>
        </p>
      </div>
    </article>
  );
}
