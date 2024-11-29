import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateCartItemQuantity: () => {},
});
// We can pass a value ( a value can be a number, string, array, object etc) to createContext that will be used as an initial value that can be provided tomultiple componentsthat will be wrappedby this context. Context Value will be stored in a variable which follows Pascal case because we use that variable as a Component.
