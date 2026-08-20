import { useState } from "react";

interface CartButtonProps {
   id: number;
   isAnimating?: boolean;
   big?: boolean;
   handleAdd: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CartButton({ handleAdd, id, big = false }: CartButtonProps) {

   const [isAnimating, setIsAnimating] = useState(false)

   async function handleAddAndFetchCart(id: number, e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation()
      e.preventDefault()

      if (!isAnimating) {
         setIsAnimating(true)
         handleAdd(id, e)
         setTimeout(() => {
            setIsAnimating(false)
         }, 1000)
      }
   }

   return (
      <button
         onClick={(e) => handleAddAndFetchCart(id, e)}
         className={`${big ? "w-full px-4 py-3 text-xs my-3 sm:my-4 md:my-6" : "mt-2"} ${isAnimating && "animate-fill-cart"} px-0 py-3 sm:py-3 text-xs sm:text-sm md:text-base xl:text-lg bg-accent md:bg-gray-50 md:hover:bg-accent hover:bg-accent border border-gray-900 transition rounded-[0.25rem] sm:rounded-lg`}
      >
         In den Warenkorb
      </button>
   );
}