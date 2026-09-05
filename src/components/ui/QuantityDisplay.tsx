import { User } from "@supabase/supabase-js";
import CartProps from "../../interfaces/CartProps";
import FavoritesProps from "../../interfaces/FavoritesProps";

interface QuantityDisplayProps {
   filtered: CartProps[] | FavoritesProps[];
   user: User | null;
   isCart: boolean;
}

export default function QuantityDisplay({ filtered, user, isCart }: QuantityDisplayProps) {

   const style = user ? "sm:w-[12rem] w-[10rem] md:w-[13.5rem]" : "sm:w-[15rem] w-[12.5rem] md:w-[17.5rem]"

   //isCart ### true => cart , false => favorites
   return (<>
      <div className={`my-1 mb-4 sm:mb-6 md:mt-0 md:mb-8 py-1 sm:py-2 xl:py-[0.6rem] ${style} text-white text-xs sm:text-sm md:text-base bg-gray-900 rounded-full`}>
         <span className="p-0 text-accent price">{filtered.length}</span> Artikel {isCart ? "im" : "in"} {!user && <span className="px-1 text-accent">lokalen</span>} {isCart ? "Warenkorb" : "Favoriten"}
      </div>
   </>)
}