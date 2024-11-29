import { createContext, useState, useReducer } from "react";
import dummyProducts from "../dummy-products-details";

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateCartItemQuantity: () => {},
});
// We can pass a value ( a value can be a number, string, array, object etc) to createContext that will be used as an initial value that can be provided tomultiple componentsthat will be wrappedby this context. Context Value will be stored in a variable which follows Pascal case because we use that variable as a Component.

function shoppingCartReducer(state, action) {}

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = dummyProducts.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const cartContextToMakeItAvailableForOtherComponents = {
    items: shoppingCart.items,
    onAddToCart: handleAddItemToCart,
    onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider
      value={cartContextToMakeItAvailableForOtherComponents}
    >
      {/* If we don't mention value prop in the above line we get warning: The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it? Error Component Stack */}
      {/* CartContext is basically an object and we access the Provider property. Provider property is not created by us */}
      {/*Below Components and their Child components can use the CartContext */}

      {children}
    </CartContext.Provider>
  );
}
