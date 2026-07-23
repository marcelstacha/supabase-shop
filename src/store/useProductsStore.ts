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
      function (set) {

         return {
            phones: [],
            error: "",
            isLoading: true,

            async fetchProducts() {
               set({ isLoading: true, error: "" })

               const { data, error } = await supabase
                  .from("product")
                  .select("*")

               if (data) {
                  set({ phones: data })
               }
               if (error) {
                  set({ error: error.message })
               }

               set({ isLoading: false })
            }
         }
      },
      { name: "phones-persist" }
   )
)