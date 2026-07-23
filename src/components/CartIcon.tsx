import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartProps from "../interfaces/CartProps";
import FavoritesProps from "../interfaces/FavoritesProps";
import { motion } from "motion/react"
import { useState } from "react";

interface CartIconProps {
   item: CartProps | FavoritesProps;
   style: string;
   addToCart: (itemId: number) => void;
}

export default function CartIcon({ addToCart, item, style }: CartIconProps) {

   const [isAnimating, setIsAnimating] = useState(false)

   function clickHandler(id: number) {
      setIsAnimating(true)
      addToCart(id)
      setTimeout(() => setIsAnimating(false), 500)
   }

   return (<>
      <motion.div
         animate={{
            scale: isAnimating ? [1, 1.3, 1] : 1,
         }}
         transition={{ duration: 0.5, ease: "easeInOut" }}
      >
         <ShoppingCartIcon
            onClick={() => clickHandler(item.prod_id)}
            className={`w-4 h-4 sm:w-6 sm:h-6 p-0 lg:pt-2 lg:pb-1 lg:w-10 lg:h-10 stroke-gray-900 hover:stroke-gray-600 cursor-pointer transition stroke-2 ${style}`}
         />
      </motion.div>
   </>)

}