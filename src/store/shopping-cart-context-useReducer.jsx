import { createContext, useState, useReducer } from "react";
import dummyProducts from "../dummy-products-details";

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateCartItemQuantity: () => {},
});
// We can pass a value ( a value can be a number, string, array, object etc) to createContext that will be used as an initial value that can be provided tomultiple componentsthat will be wrappedby this context. Context Value will be stored in a variable which follows Pascal case because we use that variable as a Component.

function shoppingCartReducer(state, action) {
  if (action.type === "add-item") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = dummyProducts.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "update-item") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ type: "add-item", payload: id });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "update-item",
      payload: { productId, amount },
    });
  }

  const cartContextToMakeItAvailableForOtherComponents = {
    items: shoppingCartState.items,
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
