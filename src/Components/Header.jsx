import CartModal from "./CartModal.jsx";
import { useRef } from "react";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Header() {
  const modal = useRef();

  const { items } = useContext(CartContext);
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header
        id="main-header"
        className="flex justify-between  items-center px-[15%] py-8"
      >
        <div id="main-title" className="flex items-center">
          <img
            src="src/assets/logo.png"
            alt="Elegant Model"
            className="w-20 h-20 object-contain mr-6"
          />
          <h1 className="uppercase text-2xl text-[#edbf68] text-center [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)] font-bold tracking-wide">
            Elegant Context
          </h1>
        </div>
        <div>
          <button
            className="bg-[#edbf68] border-none rounded-md px-4 py-1 text-[#201e1a] hover:bg-[#f5b744]"
            onClick={handleOpenCartClick}
          >
            Cart ({cartQuantity})
          </button>
        </div>
      </header>
    </>
  );
}
