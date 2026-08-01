import PhoneProps from "../interfaces/PhoneProps";
import { useProductsStore } from "../store/useProductsStore";

interface UseCurrentPhoneResult {
   phone: PhoneProps | null
   error: string | undefined
   isLoading: boolean
}

export default function useCurrentPhone(id: number): UseCurrentPhoneResult {

   const phones = useProductsStore((state) => state.phones)
   let error = undefined
   const isLoading = phones.length == 0

   const selectedPhone = phones.find((phone) => phone.id == id) || null

   if (!isLoading && selectedPhone == null) {
      error = "Produkt-ID nicht gefunden."
   }

   return { phone: selectedPhone, error: error, isLoading: isLoading }

}