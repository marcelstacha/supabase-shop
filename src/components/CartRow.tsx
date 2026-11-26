import { NavLink } from "react-router-dom";
import CartProps from "../interfaces/CartProps";
import { clean } from "../utils/utils";
import DeleteIcon from "./ui/DeleteIcon";

import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { removeFromLocal } from "../utils/localStorageHelper";

export default function CartRow({ item, update }: { item: CartProps; update: (id: number) => void }) {
   const user = useAuthStore((state) => state.user);
   const removeFromCart = useCartStore((state) => state.removeFromCart);

   function handleDelete(id: number) {
      if (user) {
         removeFromCart(id);
         update(id);
      } else {
         removeFromLocal(id);
         update(id);
      }
   }

   const id = item.prod_id;

   return (
      <>
         <tr key={id} className="group text-xs lg:text-base xl:hover:cursor-pointer !">
            <td className="xl:group-hover:bg-gray-100 pr-0 pl-0 xl:w-20 xl:h-28 size-10 sm:size-16 md:size-20">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center w-full h-full">
                  <img
                     className="xl:group-hover:brightness-105 m-auto p-[2px] sm:py-2 h-full xl:h-24 object-contain transition"
                     src={`${item.img}-1.jpg`}
                     alt={`${item.name}`}
                  />
               </NavLink>
            </td>
            <td className="xl:group-hover:bg-gray-100 p-0 w-28 sm:w-56 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex flex-col justify-center px-1 lg:px-16 w-full h-full">
                  <div className="flex sm:flex-row flex-col justify-center sm:gap-1 py-1 leading-4">
                     <span className="p-0 font-bold sm:text-base lg:text-lg xl:text-xl">{item.brand}</span>
                     <span className="p-0 text-[0.6rem] min-[440px]:text-xs sm:text-base lg:text-lg xl:text-xl transition-all">{item.name}</span>
                  </div>
               </NavLink>
            </td>
            <td className="xl:group-hover:bg-gray-100 p-0 w-[4.5rem] h-[1px] text-[0.7rem] sm:text-base md:text-lg price">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-1 sm:px-3 w-full h-full">
                  {clean(item.price)} €
               </NavLink>
            </td>
            <td
               className="group/delete xl:group-hover:bg-gray-100 pr-0 pl-0 h-[1px] size-10 sm:size-16 md:size-20 xl:size-20"
               onClick={() => handleDelete(id)}
            >
               <div className="flex justify-center items-center w-full h-full">
                  <DeleteIcon style={"md:w-7 md:h-7 w-4 h-4 sm:w-6 sm:h-6 p-0 lg:w-10 lg:h-10"} item={item} />
               </div>
            </td>
         </tr>
      </>
   );
}
