import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react"
import CartProps from "../interfaces/CartProps";
import Heading from "../components/layout/Heading";
import CheckoutRow from "../components/CheckoutRow";
import { formatPrice } from "../utils/utils";
import { useCartStore } from "../store/useCartStore";
import { useOrdersStore } from "../store/useOrdersStore";
import { SHIPPING_COST } from "../utils/constants";
import Loading from "../components/ui/Loading";

export default function Checkout() {

   const cart = useCartStore((state) => state.cart)
   const isLoading = useCartStore((state) => state.isLoading)
   const fetchCart = useCartStore((state) => state.fetchCart)
   const clearCart = useCartStore((state) => state.clearCart)
   const confirmOrder = useOrdersStore((state) => state.confirmOrder)

   const navigate = useNavigate()

   const total = cart.reduce((sum, item) => sum + item.price, SHIPPING_COST)

   useEffect(() => {
      fetchCart()
   }, [fetchCart])


   async function handleConfirm() {
      await confirmOrder()

      clearCart()
      navigate("/confirmation")
   }

   return (<>
      <Heading>Kauf bestätigen</Heading>

      <div className="flex flex-col justify-center items-center p-1 sm:p-4 md:p-8 min-h-20 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">

         <AnimatePresence>
            {isLoading ? <Loading />
               :
               cart.length > 0 ?
                  <>
                     <div className="flex flex-col justify-center m-auto w-full lg:w-[45rem]">

                        <table className="bg-white">
                           <thead className="text-[0.7rem] sm:text-lg">
                              <tr>
                                 <th>Name</th>
                                 <th>Preis</th>
                              </tr>
                           </thead>
                           <motion.tbody
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}>

                              {cart.map((item: CartProps) => (
                                 <CheckoutRow
                                    key={item.prod_id}
                                    item={item}
                                 />
                              ))
                              }
                           </motion.tbody>
                        </table>
                        <hr className="mt-8 mb-2" />
                        <div className="flex flex-col my-4 md:ml-auto">
                           <div className="flex justify-between gap-1 px-4 py-1 text-sm sm:text-base lg:text-lg">
                              <span>Versand:</span>
                              <span className="font-medium price">+{SHIPPING_COST} €</span>
                           </div>
                           <div className="flex justify-between gap-1 px-4 py-1 text-white text-sm sm:text-base lg:text-lg bg-gray-900 rounded-lg">
                              <span>Summe:</span>
                              <span className="font-semibold text-accent underlineprice">
                                 {formatPrice(total)}
                              </span>
                           </div>
                        </div>

                        <button
                           className="m-auto w-full text-xs sm:text-lg hover:bg-[rgb(57,255,20)] rounded-md cursor-pointer big-button"
                           onClick={handleConfirm}
                        >
                           Kaufen
                        </button>

                     </div>
                  </>
                  :
                  <span className="flex text-wrap">
                     Es befinden sich keine Produkte im Warenkorb.
                  </span>
            }
         </AnimatePresence>
      </div>
   </>)
}