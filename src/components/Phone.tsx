import { formatPrice } from "../utils/utils";
import PhoneProps from "../interfaces/PhoneProps";
import Heart from "./Heart";
import CartButton from "./CartButton";
import { useState } from "react";
import { motion } from "motion/react"
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

export default function Phone({ id, img, name, brand, price }: PhoneProps) {

   const [isAnimating, setIsAnimating] = useState(false)
   const [imageToggle, setImageToggle] = useState(false)

   const user = useAuthStore((state) => state.user)
   const addToCart = useCartStore((state) => state.addToCart)

   function handleAdd(id: number, e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      e.stopPropagation()
      if (!isAnimating) {
         setIsAnimating(true)
         addToCart(id)
         setTimeout(() => {
            setIsAnimating(false)
         }, 1200)
      }
   }

   return (
      <>
         <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col px-1 sm:px-2 pt-3 sm:pt-4 pb-1 sm:pb-2 bg-white/[60%] hover:bg-white opacity-100 group-hover:shadow-[0_0px_12px_rgba(0,0,0,0.3)] border border-gray-900 rounded-md sm:rounded-xl transition-all duration-500"
            onHoverStart={() => setImageToggle(true)}
            onHoverEnd={() => setImageToggle(false)}
         >
            <span className="flex flex-row-reverse p-0">
               {user &&
                  <Heart id={id} />
               }
            </span>
            <motion.img
               src={`${img}-${imageToggle ? "2" : "1"}.jpg`} alt={`${brand} ${name}`}
               key={id}
               initial={{ opacity: 0, mixBlendMode: 'darken' }}
               animate={{ opacity: 1, mixBlendMode: 'darken' }}
               exit={{ opacity: 0, mixBlendMode: 'darken' }}
               transition={{ duration: 1 }}
               className="m-auto sm:mt-2 mb-3 sm:mb-2 px-1 h-32 sm:h-56 object-contain transition mix-blend-darken" /* group-hover:brightness-110 */
            />
            <span className="md:my-2 mb-1 p-0">
               <span className="flex sm:flex-row flex-col justify-center items-center gap-0 sm:gap-1 p-0">
                  <h1 className="font-bold text-base lg:text-lg xl:text-xl leading-1 transition-all">{brand}</h1>
                  <h1 className="-mt-1 sm:mt-0 overflow-hidden font-medium text-[0.85rem] sm:text-sm md:text-base lg:text-lg xl:text-xl leading-1 whitespace-nowrap transition-all">{name}</h1>
               </span>
               <h2 className="mt-1 text-sm md:text-base xl:text-lg text-center transition-all price">{formatPrice(price)}</h2>
            </span>
            <CartButton
               isAnimating={isAnimating}
               handleAdd={handleAdd}
               id={id}
            />
         </motion.div>
      </>
   );
}
