import { User } from "@supabase/supabase-js";
import CartProps from "../interfaces/CartProps";
import FavoritesProps from "../interfaces/FavoritesProps";

interface QuantityDisplayProps {
   filtered: CartProps[] | FavoritesProps[];
   user: User | null;
   isCart: boolean;
}
export default function QuantityDisplay({ filtered, user, isCart }: QuantityDisplayProps) {
   //isCart ### true => cart , false => favorites
   return (<>
      <div className="sm:m-6 my-4 md:mt-0 md:mb-8 px-3 sm:px-4 md:px-5 py-1 md:py-2 text-white text-xs sm:text-sm md:text-base bg-gray-900 rounded-full">
         <span className="p-0 price">{filtered.length}</span> Artikel {isCart ? "im" : "in"} {!user && <span className="px-1 text-accent">lokalen</span>} {isCart ? "Warenkorb" : "Favoriten"}
      </div>
   </>)
}