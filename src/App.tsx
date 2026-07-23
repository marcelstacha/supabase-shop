import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import './App.css';
import Home from "./pages/Home";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import PhoneDetail from "./pages/PhoneDetail";
import PhoneGrid from "./pages/PhoneGrid";

import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import PhoneList from "./pages/PhoneList";

import { supabase } from "./supabaseClient";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore";
import { syncDBCart } from "./utils/localStorageHelper";
import { useCartStore } from "./store/useCartStore";

function App() {

   const fetchUser = useAuthStore((state) => state.fetchUser);
   const user = useAuthStore((state) => state.user);

   const fetchCart = useCartStore((state) => state.fetchCart);

   useEffect(() => {
      fetchUser();

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            useAuthStore.setState({ user: session?.user || null });
         } else if (event === "SIGNED_OUT") {
            useAuthStore.setState({ user: null });
         }
      });

      return () => subscription.unsubscribe();
   }, [fetchUser]);

   useEffect(() => {

      if (user) {
         syncDBCart(user).then(() => {
            fetchCart()
         })
      } else {
         fetchCart()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   return (

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
   )
}

export default App