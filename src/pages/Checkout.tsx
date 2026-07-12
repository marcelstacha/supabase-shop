import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react"
import CartProps from "../interfaces/CartProps";
import { useCart } from "../context/CartContext";
import PageHeading from "../components/PageHeading";
import CheckoutRow from "../components/CheckoutRow";
import { useOrders } from "../context/OrdersContext";
import { formatPrice } from "../utils/utils";

export default function Checkout() {

   const { cart, isLoading, fetchCart, clearCart } = useCart()
   const { confirmOrder } = useOrders()
   const navigate = useNavigate()

   const total = cart.reduce((sum, item) => sum + item.price, 4.99)

   async function handleConfirm() {
      await confirmOrder()

      clearCart()
      navigate("/confirmation")
   }

   useEffect(() => {
      fetchCart()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (<>
      <PageHeading>Kauf bestätigen</PageHeading>

      <div className="flex flex-col justify-center p-0 sm:px-10 md:px-16 lg:px-24 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         <AnimatePresence>
            {isLoading ? <span>Laden...</span>
               :
               cart.length > 0 ?
                  <>
                     <div className="m-auto my-2 sm:my-6">

                        <table className="w-full bg-white">
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

                        <div className="flex flex-col my-4 md:ml-auto px-1">
                           <div className="flex justify-between text-sm sm:text-base lg:text-lg">
                              <span>Versand:</span>
                              <span className="font-bold price">+4,99 €</span>
                           </div>
                           <div className="flex justify-between text-sm sm:text-base lg:text-lg">
                              <span>Summe:</span>
                              <span className="font-bold underline price">{formatPrice(total)}</span>
                           </div>
                        </div>

                        <button
                           className="m-auto w-48 sm:w-64 h-12 sm:h-16 text-xs sm:text-lg hover:bg-[rgb(57,255,20)] rounded-md cursor-pointer big-button"
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