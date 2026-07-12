import { useState } from "react";
import { useCart } from "../context/CartContext";

interface CartButtonProps {
   id: number;
   isAnimating?: boolean;
   big?: boolean;
   handleAdd: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CartButton({ handleAdd, id, big = false }: CartButtonProps) {

   const { fetchCart } = useCart()

   const [isAnimating, setIsAnimating] = useState(false)

   async function handleAddAndFetchCart(id: number, e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation()
      e.preventDefault()
      try {
         await fetchCart()
      }
      finally {
         if (!isAnimating) {
            handleAdd(id, e)
            setIsAnimating(true)
            setTimeout(() => {
               setIsAnimating(false)
            }, 1200);
         }
      }

   }

   return (
      <button
         onClick={(e) => handleAddAndFetchCart(id, e)}
         className={`${big ? "px-4 py-3 text-xs my-2" : "mt-2"} ${isAnimating && "animate-fill-cart"} px-0 py-[0.625rem] sm:py-3 text-[0.75rem] sm:text-sm md:text-base xl:text-lg bg-accent md:bg-gray-50 md:hover:bg-accent hover:bg-accent border border-gray-900 transition rounded-[0.25rem] sm:rounded-lg`}
      >
         In den Warenkorb
      </button>
   );
}