import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import PhoneProps from "../interfaces/PhoneProps";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface UseCurrentPhoneResult {
   phone: PhoneProps | null
   error: string | undefined
   isLoading: boolean
}

export default function useCurrentPhone(id: number): UseCurrentPhoneResult {
   const [error, setError] = useState<string | undefined>(undefined)
   const [phone, setPhone] = useState<PhoneProps | null>(null)
   const [isLoading, setIsLoading] = useState(true);

   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)

   useEffect(() => {
      async function fetchPhone() {
         setIsLoading(true)
         fetchFavorites()
         const { data, error } = await supabase
            .from('product')
            .select('*')
            .eq("id", id)

         if (error) {
            setError(error.message)
         } else if (data) {
            setPhone(data[0] || null)
         }
         setIsLoading(false)
      }

      fetchPhone()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id])

   return { phone, error, isLoading }
}