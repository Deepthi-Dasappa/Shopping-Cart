import Header from "./Components/Header.jsx";
import Shop from "./Components/Shop.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import dummyProducts from "./dummy-products-details.js";
import Product from "./Components/Product.jsx";

export default function App() {
  return (
    <CartContextProvider>
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
    </CartContextProvider>
  );
}
