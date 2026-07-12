import { UserCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import SearchMobile from "./SearchMobile";
import { useCart } from "../context/CartContext";
import ShoppingCart from "./ShoppingCart";

export default function NavBar() {

   const { length } = useCart()

   return (<>

      <div className="z-[70] flex sm:flex justify-between items-center gap-3 sm:gap-1 md:gap-4 md:mr-4 w-64 text-sm md:text-4xl">

         <SearchMobile />
         <NavLink
            title="Nutzer"
            className="group" to={"/user"}
         >
            <span className="flex items-center px-0 sm:px-2">
               <UserCircleIcon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-gray-900 group-hover:text-primary" />
            </span>
         </NavLink>
         <NavLink
            title="Favoriten"
            className="group" to={"/favorites"}
         >
            <span className="flex items-center px-0 sm:px-2">
               <HeartIcon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-gray-900 group-hover:text-red-500" />
            </span>
         </NavLink>
         <NavLink
            title="Einkaufswagen"
            className="group relative" to={"/cart"}
         >
            <ShoppingCart
               length={length}
            />
         </NavLink>

      </div>
   </>)
}
