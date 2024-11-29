import Header from "./Components/Header.jsx";
import Shop from "./Components/Shop.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import { useState } from "react";
import dummyProducts from "./dummy-products-details.js";
import Product from "./Components/Product.jsx";

export default function App() {
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
      <Header />
      <Shop>
        {
          <ul id="products" className="list-none grid grid-cols-3 gap-9">
            {dummyProducts.map((product) => {
              return (
                <li key={product.id}>
                  <Product {...product} />
                </li>
              );
            })}
          </ul>
        }
      </Shop>
    </CartContext.Provider>
  );
}
