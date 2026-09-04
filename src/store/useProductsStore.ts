import { create } from "zustand"
import { persist } from "zustand/middleware";
import PhoneProps from "../interfaces/PhoneProps";
import { supabase } from "../supabaseClient";

interface ProductsState {
   phones: PhoneProps[];
   error: string;
   isLoading: boolean;
   fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>()(
   persist(
      function (set, get) {

         return {
            phones: [],
            error: "",
            isLoading: true,

            async fetchProducts() {
               const currentPhones = get().phones

               if (currentPhones.length === 0) {
                  set({ isLoading: true, error: "" })
               }

               set({ isLoading: true, error: "" })
               try {
                  const { data, error } = await supabase
                     .from("product")
                     .select("*")

                  if (data) {
                     set({ phones: data, isLoading: false })
                  }
                  if (error) {
                     if (get().phones.length === 0) {
                        set({ error: error.message, isLoading: false })
                     } else {
                        set({ isLoading: false })
                     }
                  }
               }
               catch (err) {
                  if (get().phones.length === 0) {
                     const errorMessage = err instanceof Error ? err.message : "Ein unbekannter Netzwerkfehler ist aufgetreten";
                     set({ error: errorMessage || "Netzwerkfehler", isLoading: false })
                  } else {
                     set({ isLoading: false })
                  }
               }
            }
         }
      },
      { name: "phones-persist" }
   )
)