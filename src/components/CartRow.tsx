import { NavLink } from "react-router-dom";
import CartProps from "../interfaces/CartProps";
import { clean } from "../utils/utils";
import DeleteIcon from "./DeleteIcon";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

export default function CartRow({ item, update }: { item: CartProps, update: (id: number) => void }) {

   const user = useAuthStore((state) => state.user)
   const removeFromCart = useCartStore((state) => state.removeFromCart)

   const { removeFromLocal } = useLocalStorage()

   function handleDelete(id: number) {
      if (user) {
         removeFromCart(id)
         update(id)
      } else {
         removeFromLocal(id)
         update(id)
      }
   }

   const id = item.prod_id != undefined ? item.prod_id : item.id

   return (<>
      <tr key={item.id} className="group text-xs lg:text-base xl:hover:cursor-pointer">
         <td className="pr-0 pl-0 size-10 sm:size-16 md:size-20 xl:size-20 xl:group-hover:bg-gray-100">
            <NavLink to={`/phonedetail/${id}`} className="">
               <img
                  className="m-auto p-[2px] sm:py-2 size-full xl:size-24 object-contain xl:group-hover:brightness-105 transition"
                  src={`${item.img}-1.jpg`}
                  alt={`${item.name}`}
               />
            </NavLink>
         </td>
         <td className="p-0 w-28 sm:w-56 h-[1px] xl:group-hover:bg-gray-100">
            <NavLink
               to={`/phonedetail/${id}`}
               className="flex flex-col justify-center px-1 lg:px-16 w-full h-full"
            >
               <div className="flex sm:flex-row flex-col justify-center sm:gap-1 py-1 leading-4">
                  <span className="p-0 font-bold sm:text-base lg:text-lg xl:text-xl">{item.brand}</span>
                  <span className="p-0 sm:text-base lg:text-lg xl:text-xl">{item.name}</span>
               </div>
            </NavLink>
         </td>
         <td className="p-0 w-[4.5rem] h-[1px] text-xs sm:text-base md:text-lg xl:text-xl xl:group-hover:bg-gray-100 price">
            <NavLink
               to={`/phonedetail/${id}`}
               className="flex justify-end items-center pr-1 sm:pr-5 w-full h-full whitespace-nowrap"
            >
               {clean(item.price)} €
            </NavLink>
         </td>
         <td className="pr-0 pl-0 h-[1px] size-10 sm:size-16 md:size-20 xl:size-20 xl:group-hover:bg-red-100/30" onClick={() => handleDelete(id)}>
            <div className="flex justify-center items-center w-full h-full">
               <DeleteIcon
                  style={"md:w-7 md:h-7"}
                  item={item}
               />
            </div>
         </td>
      </tr>
   </>)
}