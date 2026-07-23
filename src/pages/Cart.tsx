import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeading from "../components/PageHeading";
import CartList from "../components/CartList";
import { formatPrice } from "../utils/utils";
import useLocalStorage from "../hooks/useLocalStorage";
import { supabase } from "../supabaseClient";
import CartProps from "../interfaces/CartProps";
import QuantityDisplay from "../components/QuantityDisplay";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

export default function Cart() {

   const cart = useCartStore((state) => state.cart)
   const isLoading = useCartStore((state) => state.isLoading)
   const fetchCart = useCartStore((state) => state.fetchCart)
   const filtered = useCartStore((state) => state.filtered)
   const setFiltered = useCartStore((state) => state.setFiltered)

   const user = useAuthStore((state) => state.user)

   const { getLocalArray } = useLocalStorage()
   const navigate = useNavigate()
   const localArray = getLocalArray()

   useEffect(() => {
      if (user) {
         fetchCart()
      } else {
         getLocalCart()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   useEffect(() => {
      if (user) {
         setFiltered(cart)
      }
      cartSum()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cart]);

   async function getLocalCart() {
      const temp: CartProps[] = []
      await Promise.all(localArray.map(async (id) => {
         const { data, error } = await supabase
            .from("product")
            .select("*")
            .eq("id", id)
         if (data) {
            temp.push(...data as CartProps[])
         }
         if (error) {
            console.error(error.message)
         }
      }))
      setFiltered(temp.flat())
   }

   function optimisticUpdate(id: number) {
      const newFiltered = filtered.filter((item) => {
         const x = item.prod_id != undefined ? item.prod_id : item.id
         return x != id
      })

      setFiltered(newFiltered)
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
      <PageHeading>Warenkorb</PageHeading>
      <div className="flex flex-col justify-center items-center p-0 py-1 md:py-10 min-h-20 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         {isLoading ? <span className="flex justify-center text-wrap">Laden...</span>
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

                  <div className="flex flex-row justify-center gap-2 mt-6 w-full text-base sm:text-base lg:text-xl">
                     <span>Summe:</span>
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
