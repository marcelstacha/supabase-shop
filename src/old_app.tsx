import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import './App.css';
import Home from "./pages/Home";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import PhoneDetail from "./pages/PhoneDetail";
import PhoneGrid from "./pages/PhoneGrid";

import { AuthProvider } from "./context/AuthContext"
import { ProductsProvider } from "./context/ProductsContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { OrdersProvider } from "./context/OrdersContext";
import PhoneList from "./pages/PhoneList";

function App() {
   return (

      <AuthProvider>
         <ProductsProvider>
            <CartProvider>
               <FavoriteProvider>

                  <OrdersProvider>
                     <Router>
                        <Routes>
                           <Route path="/" element={<Layout />}>
                              <Route index element={<Home />} />
                              <Route path="phonegrid" element={<PhoneGrid />} />
                              <Route path="phonelist" element={<PhoneList />} />
                              <Route path="/phonedetail/:id" element={<PhoneDetail />} />
                              <Route path="checkout" element={<Checkout />} />
                              <Route path="favorites" element={<Favorites />} />
                              <Route path="cart" element={<Cart />} />
                              <Route path="confirmation" element={<Confirmation />} />
                              <Route path="user" element={<User />} />
                           </Route>
                        </Routes>
                     </Router>
                  </OrdersProvider>

               </FavoriteProvider>
            </CartProvider>
         </ProductsProvider>
      </AuthProvider>

   )
}

export default App