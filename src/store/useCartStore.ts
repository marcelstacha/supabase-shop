import { create } from "zustand";
import CartProps from "../interfaces/CartProps";
import { supabase } from "../supabaseClient";
import { getLocalArray, setLocalStorage, removeFromLocal } from "../utils/localStorageHelper";

import { useAuthStore } from "./useAuthStore";

interface CartState {
   cart: CartProps[];
   filtered: CartProps[];
   isLoading: boolean;
   error: string;

   setFiltered: (filtered: CartProps[]) => void;
   setCart: (cart: CartProps[]) => void

   addToCart: (id: number) => Promise<void>;
   removeFromCart: (id: number) => Promise<void>;
   fetchCart: () => Promise<void>;
   clearCart: () => Promise<void>;
   isItemInCart: (id: number) => boolean;
}

export const useCartStore = create<CartState>()(function (set, get) {

   return {

      cart: [] as CartProps[],
      filtered: [] as CartProps[],
      isLoading: false,
      error: "",

      setFiltered: (filtered) => set({ filtered }),
      setCart: (cart) => set({ cart }),


      async fetchCart() {

         const user = useAuthStore.getState().user
         const local = getLocalArray()

         set({ isLoading: true })
         set({ error: "" })

         if (!user) {
            if (local.length == 0) {
               set({ cart: [], filtered: [], isLoading: false })
               return;
            } else {
               const { data, error } = await supabase
                  .from("product")
                  .select("*")
                  .in("id", local)
               if (error) set({ error: error.message })
               if (data && !error) {
                  const guestCart = data.map(item => ({ ...item, prod_id: item.id } as CartProps));
                  set({ filtered: guestCart, cart: guestCart })
               }
            }
            set({ isLoading: false })
            return
         }

         if (user) {
            const { data, error } = await supabase
               .from("cart_view")
               .select("*")
               .eq("user_id", user.id)
               .order("brand", { ascending: true })
               .order("name", { ascending: true })
            if (data) {
               set({ cart: data, filtered: data })
            }
            if (error) {
               set({ error: error.message })
            }
         }
         set({ isLoading: false })
      },



      async addToCart(id: number) {
         const user = useAuthStore.getState().user
         const isInFiltered = get().filtered.some((item) => item.prod_id == id);

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
                  get().fetchCart();
               }
            } else {
               setLocalStorage(id)
               const { data, error } = await supabase
                  .from("product")
                  .select("*")
                  .eq("id", id)
                  .single(); // .single() gibt ein einzelnes Objekt statt eines Arrays zurück

               if (data && !error) {
                  const currentFiltered = get().filtered;

                  const newItem = {
                     ...data,
                     prod_id: id
                  } as CartProps;
                  set({ filtered: [...currentFiltered, newItem] });
               }
            }
         }
      },



      async removeFromCart(id: number) {
         const user = useAuthStore.getState().user

         const isInCart = get().isItemInCart(id)

         if (!isInCart) {
            return;
         }

         if (!user) {
            removeFromLocal(id)
            const newFiltered = get().filtered.filter((item) => item.prod_id != id);
            set({ cart: newFiltered, filtered: newFiltered });
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

      },

      async clearCart() {
         const user = useAuthStore.getState().user

         if (!user) {
            return
         }

         const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', user.id);
         if (error) {
            console.error(error.message);
         }
      },

      isItemInCart(id: number) {
         return get().filtered.some((item) => item.prod_id == id);
      },

   }
}
)