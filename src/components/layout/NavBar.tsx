import { UserCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import ShoppingCart from "../ShoppingCart";
import SearchMobile from "./SearchMobile";

export default function NavBar() {

   const user = useAuthStore((state) => state.user)
   //  const logout = useAuthStore((state) => state.logout)
   const fetchCart = useCartStore((state) => state.fetchCart)
   const filtered = useCartStore((state) => state.filtered)

   useEffect(() => {
      fetchCart()
   }, [user, fetchCart])

   return (<>

      <div className="z-[70] flex sm:flex justify-between items-center gap-2 sm:gap-0 min-[500px]:gap-3 md:gap-2 text-sm md:text-4xl">

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
               length={filtered.length}
            />
         </NavLink>

      </div>
   </>)
}
