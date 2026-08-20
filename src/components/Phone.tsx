import { useState } from "react";
import { formatPrice } from "../utils/utils";
import CartButton from "./ui/CartButton";
import HeartIcon from "./ui/HeartIcon";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import PhoneProps from "../interfaces/PhoneProps";

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
         }, 1000)
      }
   }

   return (
      <>
         <div
            className="group flex flex-col px-1 sm:px-2 pt-4 sm:pt-4 pb-1 sm:pb-2 bg-white group-hover:shadow-[0_0px_14px_rgba(0,0,0,0.3)] hover:brightness-105 border border-gray-900 rounded-md sm:rounded-xl transition-all duration-300"
            onMouseEnter={() => setImageToggle(true)}
            onMouseLeave={() => setImageToggle(false)}
         >
            <span className="flex flex-row-reverse p-0">
               {user &&
                  <HeartIcon id={id} />
               }
            </span>
            <img src={`${img}-1.jpg`} className="hidden" />
            <img src={`${img}-2.jpg`} className="hidden" />
            <img
               src={`${img}-${imageToggle ? "2" : "1"}.jpg`} alt={`${brand} ${name}`}
               className="m-auto sm:mt-2 mb-3 sm:mb-2 px-1 h-[7.5rem] 2xl:h-56 xl:h-36 object-contain transition w mix-blend-darken"
            />
            <span className="md:my-2 mb-1 p-0">
               <span className="flex sm:flex-row flex-col justify-center items-center gap-0 sm:gap-1 p-0">
                  <h1 className="font-bold lg:text-[1.05rem] xl:text-[1.21rem] text-base leading-1 transition-all">{brand}</h1>
                  <h1 className="-mt-1 sm:mt-0 overflow-hidden font-medium text-[0.75rem] min-[400px]:text-[0.9rem] lg:text-[1.05rem] xl:text-[1.21rem] sm:text-base md:text-base truncate leading-1 whitespace-nowrap transition-all">{name}</h1>
               </span>
               <h2 className="mt-1 text-sm md:text-base xl:text-lg text-center transition-all price">{formatPrice(price)}</h2>
            </span>
            <CartButton
               isAnimating={isAnimating}
               handleAdd={handleAdd}
               id={id}
            />
         </div>
      </>
   )
}
