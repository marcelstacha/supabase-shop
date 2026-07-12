import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import CartProps from "../interfaces/CartProps";
import useLocalStorage from "../hooks/useLocalStorage";

interface CartContextType {
   cart: CartProps[];
   filtered: CartProps[];
   isLoading: boolean;
   error: string;
   length: number;
   setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
   setFiltered: React.Dispatch<React.SetStateAction<CartProps[]>>;
   setLength: React.Dispatch<React.SetStateAction<number>>;
   addToCart: (id: number) => Promise<void>;
   removeFromCart: (id: number) => Promise<void>;
   fetchCart: () => Promise<void>;
   clearCart: () => Promise<void>;
   checkIsInCart: (id: number) => boolean;
}

interface CartProviderProps {
   children: ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {

   const [cart, setCart] = useState<CartProps[]>([])
   const [filtered, setFiltered] = useState(cart || [])
   const [error, setError] = useState("")
   const [isLoading, setIsLoading] = useState(true)
   const [length, setLength] = useState(0)

   const { user, isSyncingCart } = useAuth()
   const { setLocalStorage, getLocalArray } = useLocalStorage()

   const prevCart = useRef<number>(cart.length)
   const prevFiltered = useRef<number>(filtered.length)

   useEffect(() => {
      if (!user) {
         setFiltered([])
         prevCart.current = 0
         prevFiltered.current = 0
      }
      if (!isSyncingCart) {
         fetchCart()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user, isSyncingCart])

   useEffect(() => {
      if (filtered.length !== prevFiltered.current) {
         prevFiltered.current = filtered.length;
         setLength(filtered.length);
      } else if (cart.length !== prevCart.current) {
         prevCart.current = cart.length;
         setLength(cart.length);
      }
   }, [cart, filtered]);

   useEffect(() => {
      if (!user) {
         setLength(getLocalArray().length);
      }
   }, [getLocalArray, user]);

   async function fetchCart() {
      if (!user) {
         setCart([]);
         setIsLoading(false);
         return;
      }

      setIsLoading(true);
      setError("");
      if (user) {
         const { data, error } = await supabase
            .from("cart_view")
            .select("*")
            .eq("user_id", user.id)
            .order("brand", { ascending: true })
            .order("name", { ascending: true })
         if (data) {
            setCart(data);
         }
         if (error) setError(error.message);
      }
      setIsLoading(false);
   }

   async function addToCart(id: number) {
      const isInFiltered = filtered.some((item) => item.prod_id == id);
      if (!isInFiltered) {
         if (user) {
            const { error } = await supabase
               .from('cart')
               .upsert(
                  { "user_id": user.id.toString(), "prod_id": Number(id) },
                  { onConflict: 'user_id, prod_id', ignoreDuplicates: true }
               );
            if (error && error.code != "23505") {
               console.error(error.message)
            } else {
               fetchCart();
            }
         } else {
            setLocalStorage(id);
         }
      }
   }

   function checkIsInCart(id: number) {
      return filtered.some((item) => item.prod_id == id);
   }

   async function removeFromCart(id: number) {
      if (!user) return;
      const isInCart = checkIsInCart(id)
      if (!isInCart) {
         return;
      } else {
         const { error } = await supabase
            .from('cart')
            .delete()
            .eq("prod_id", id)
            .eq('user_id', user.id);
         if (error) {
            console.error(error.message);
         }
      }
   }

   async function clearCart() {
      if (!user) return;

      const { error } = await supabase
         .from('cart')
         .delete()
         .eq('user_id', user.id);
      if (error) {
         console.error(error.message);
      }
   }

   return (
      <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, isLoading, error, fetchCart, clearCart, filtered, setFiltered, length, setLength, checkIsInCart }}>
         {children}
      </CartContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
   const context = useContext(CartContext);

   if (context === undefined) {
      throw new Error("useCart error");
   }

   return context;
};