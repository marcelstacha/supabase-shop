import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAnimate } from "motion/react";
import CartProps from "../../interfaces/CartProps";
import FavoritesProps from "../../interfaces/FavoritesProps";

interface CartIconProps {
   item: CartProps | FavoritesProps;
   style: string;
   addToCart: (itemId: number) => void;
}

export default function CartIcon({ addToCart, item, style }: CartIconProps) {
   const [scope, animate] = useAnimate();

   function clickHandler(id: number) {
      animate(scope.current, { scale: [1, 1.15, 1] }, { duration: 0.35, ease: "circInOut" });
      addToCart(id);
   }

   return (
      <>
         <div ref={scope}>
            <ShoppingCartIcon
               onClick={() => clickHandler(item.prod_id)}
               className={`lg:pt-2 lg:pb-1 stroke-gray-700 will-change-transform hover:stroke-gray-950 hover:scale-110 cursor-pointer transition stroke-2 ${style}`}
            />
         </div>
      </>
   );
}
