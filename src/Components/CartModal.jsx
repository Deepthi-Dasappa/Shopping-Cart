import { createPortal } from "react-dom";
import { useRef, useImperativeHandle, forwardRef } from "react";
import Cart from "./Cart.jsx";

const CartModal = forwardRef(function CartModal({ title, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      id="modal"
      className="w-[30%] bg-#d3b17b rounded-md shadow-xl shadow-black backdrop:bg-black backdrop:opacity-70 p-6"
    >
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("cart-modal")
  );
});

export default CartModal;
