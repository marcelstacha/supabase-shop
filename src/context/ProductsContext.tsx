import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ReactNode } from "react";
import PhoneProps from "../interfaces/PhoneProps";

interface ProductsContextType {
   phones: PhoneProps[];
   setPhones: React.Dispatch<React.SetStateAction<PhoneProps[]>>;
   error: string;
   isLoading: boolean;
}

interface ProductsProviderProps {
   children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {

   const [error, setError] = useState("")
   const [phones, setPhones] = useState<PhoneProps[]>([])
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetchProducts()
   }, [])


   async function fetchProducts() {
      setIsLoading(true);
      setError("");

      const { data, error } = await supabase
         .from("product")
         .select("*")

      if (data) {
         setPhones(currentPhones => {
            if (JSON.stringify(currentPhones) === JSON.stringify(data)) {
               return currentPhones
            } else {
               return data;
            }
         });
      }
      if (error) setError(error.message);
      setIsLoading(false);
   }

   return (
      <ProductsContext.Provider value={{ phones, setPhones, error, isLoading }}>
         {children}
      </ProductsContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = (): ProductsContextType => {
   const context = useContext(ProductsContext)

   if (context == undefined) {
      throw new Error("useProducts error")
   }

   return context;
}