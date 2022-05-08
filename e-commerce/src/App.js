import React, {useState, useEffect} from 'react'
import { commerce } from './lib/commerce';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Navigation from './Components/Navigation/Navigation'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };


  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);
  console.log(cart);

  return (
    <Router>
      <Navigation totalItems={cart.total_items} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
