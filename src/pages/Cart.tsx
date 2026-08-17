import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Heading from "../components/layout/Heading";
import CartList from "../components/CartList";
import QuantityDisplay from "../components/ui/QuantityDisplay";

import { formatPrice } from "../utils/utils";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

export default function Cart() {

   const cart = useCartStore((state) => state.cart)
   const isLoading = useCartStore((state) => state.isLoading)
   const fetchCart = useCartStore((state) => state.fetchCart)
   const filtered = useCartStore((state) => state.filtered)
   const setFiltered = useCartStore((state) => state.setFiltered)

   const user = useAuthStore((state) => state.user)

   const navigate = useNavigate()

   useEffect(() => {
      fetchCart()
   }, [fetchCart, user])

   useEffect(() => {
      if (user) {
         setFiltered(cart)
      }
   }, [cart, setFiltered, user]);

   function optimisticUpdate(id: number) {
      setFiltered(filtered.filter((item) => item.prod_id != id))
   }

   function cartSum() {
      return filtered.reduce((acc, row) => acc + row.price, 0)
   }

   function handleClick() {
      if (user) {
         navigate('/checkout');
      } else {
         navigate('/user');
      }
   }

   return (<>
      <Heading>Warenkorb</Heading>
      <div className="flex flex-col justify-center items-center p-0 py-1 md:py-8 min-h-20 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         {isLoading && user && filtered.length == 0 ? <span className="flex justify-center text-wrap">Laden...</span>
            :
            filtered.length > 0 ?
               <>
                  <QuantityDisplay
                     isCart={true}
                     filtered={filtered}
                     user={user}
                  />
                  <CartList
                     filtered={filtered}
                     optimisticUpdate={optimisticUpdate}
                  />

                  <div className="flex flex-row justify-center gap-2 mt-4 md:mt-6 w-full text-base sm:text-base md:text-xl">
                     <span>Zwischensumme:</span>
                     <span className="font-bold underline price">{formatPrice(cartSum())}</span>
                  </div>
                  <button
                     onClick={handleClick}
                     className="mt-3 md:mt-6 mb-2 hover:bg-accent big-button"
                  >
                     Zur Kasse
                  </button>
               </>
               :
               <span className="flex justify-center px-3 text-wrap">
                  Es befinden sich keine Produkte im Warenkorb.
               </span>
         }
      </div>
   </>)
}
