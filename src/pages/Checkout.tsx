import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutRow from "../components/CheckoutRow";
import Heading from "../components/layout/Heading";
import Loading from "../components/ui/Loading";
import CartProps from "../interfaces/CartProps";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useOrdersStore } from "../store/useOrdersStore";
import { SHIPPING_COST } from "../utils/constants";
import { formatPrice } from "../utils/utils";

export default function Checkout() {
   const user = useAuthStore((state) => state.user);
   const cart = useCartStore((state) => state.cart);
   const isLoading = useCartStore((state) => state.isLoading);
   const fetchCart = useCartStore((state) => state.fetchCart);
   const clearCart = useCartStore((state) => state.clearCart);
   const confirmOrder = useOrdersStore((state) => state.confirmOrder);

   const navigate = useNavigate();

   const [isSubmitting, setIsSubmitting] = useState(false);

   const total = cart.reduce((sum, item) => sum + item.price, SHIPPING_COST);

   useEffect(() => {
      fetchCart();
   }, [fetchCart]);

   async function handleConfirm() {
      if (!user) {
         navigate("/user");
         return;
      }
      if (cart.length === 0 || isSubmitting) {
         return;
      }

      setIsSubmitting(true);

      try {
         await confirmOrder();
         clearCart();
         navigate("/confirmation");
      } catch (err) {
         console.log(err);
      } finally {
         setIsSubmitting(false);
      }
   }

   return (
      <>
         <Heading>Kauf bestätigen</Heading>

         <div className="flex flex-col justify-center items-center bg-white p-1 sm:p-4 md:p-8 border border-gray-900 rounded-lg min-h-20 text-sm lg:text-lg text-nowrap">
            <AnimatePresence>
               {isLoading ? (
                  <Loading />
               ) : cart.length > 0 ? (
                  <>
                     <div className="flex flex-col justify-center m-auto w-full lg:w-[45rem]">
                        <table className="bg-white">
                           <thead className="text-[0.7rem] sm:text-lg">
                              <tr>
                                 <th>Name</th>
                                 <th>Preis</th>
                              </tr>
                           </thead>
                           <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                              {cart.map((item: CartProps) => (
                                 <CheckoutRow key={item.prod_id} item={item} />
                              ))}
                           </motion.tbody>
                        </table>
                        <hr className="my-8" />
                        <div className="flex flex-col gap-2 mb-4 md:ml-auto">
                           <div className="flex justify-between gap-1 px-4 pr-5 text-sm sm:text-base lg:text-lg">
                              <span className="p-0">Versand:</span>
                              <span className="p-0 font-medium price">+ {formatPrice(SHIPPING_COST)}</span>
                           </div>
                           <div className="flex justify-between gap-1 bg-gray-900 px-4 py-1 rounded-lg text-white text-sm sm:text-base lg:text-lg">
                              <span>Summe:</span>
                              <span className="font-semibold text-accent underlineprice price">{formatPrice(total)}</span>
                           </div>
                        </div>

                        <button
                           className="hover:bg-[rgb(57,255,20)] m-auto rounded-md w-full text-xs sm:text-lg cursor-pointer big-button"
                           onClick={handleConfirm}
                        >
                           Kaufen
                        </button>
                     </div>
                  </>
               ) : (
                  <span className="flex text-wrap">Es befinden sich keine Produkte im Warenkorb.</span>
               )}
            </AnimatePresence>
         </div>
      </>
   );
}
