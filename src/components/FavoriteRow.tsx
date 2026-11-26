import { NavLink } from "react-router-dom";
import FavoritesProps from "../interfaces/FavoritesProps";
import { clean } from "../utils/utils";
import CartIcon from "./ui/CartIcon";
import DeleteIcon from "./ui/DeleteIcon";

import { useCartStore } from "../store/useCartStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function FavoriteRow({ item }: { item: FavoritesProps }) {
   const addToCart = useCartStore((state) => state.addToCart);
   const deleteFavorite = useFavoritesStore((state) => state.deleteFavorite);

   function handleDelete(id: number) {
      deleteFavorite(id);
   }

   const id = item.prod_id;

   return (
      <>
         <tr key={item.fav_id} className="group w-full text-xs lg:text-base cursor-pointer">
            <td className="xl:group-hover:bg-gray-100 pr-0 pl-0 h-[1px] size-10 sm:size-16 md:size-20 xl:size-20">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center w-full h-full">
                  <img
                     className="xl:group-hover:brightness-105 m-auto p-[2px] sm:py-2 size-full xl:size-24 object-contain transition"
                     src={`${item.img}-1.jpg`}
                     alt={`${item.prod_name}`}
                  />
               </NavLink>
            </td>
            <td className="xl:group-hover:bg-gray-100 p-0 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex flex-col justify-center w-full h-full">
                  <div className="flex min-[470px]:flex-row flex-col justify-center min-[470px]:gap-1 px-[2px] min-[470px]:px-2 md:px-4 w-full leading-4">
                     <span className="px-0 py-0 font-bold text-xs min-[470px]:text-sm sm:text-base">{item.brand}</span>
                     <span className="px-0 py-0 text-xs min-[470px]:text-sm sm:text-base">{item.prod_name}</span>
                  </div>
               </NavLink>
            </td>
            <td className="hidden lg:table-cell xl:group-hover:bg-gray-100 p-0 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-2 w-full h-full">
                  {item.screen}"
               </NavLink>
            </td>
            <td className="hidden xl:table-cell xl:group-hover:bg-gray-100 p-0 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-2 w-full h-full">
                  {item.soc}
               </NavLink>
            </td>
            <td className="hidden lg:table-cell xl:group-hover:bg-gray-100 p-0 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-2 w-full h-full">
                  {item.battery}mAh
               </NavLink>
            </td>
            <td className="hidden 2xl:table-cell xl:group-hover:bg-gray-100 p-0 w-16 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-2 w-full h-full">
                  {item.charging}W
               </NavLink>
            </td>
            <td className="hidden 2xl:table-cell xl:group-hover:bg-gray-100 p-0 w-16 h-[1px]">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-2 w-full h-full">
                  {item.charging_wireless && item.charging_wireless > 0 ? item.charging_wireless + "W" : "❌"}
               </NavLink>
            </td>
            <td className="xl:group-hover:bg-gray-100 p-0 w-[4.5rem] h-[1px] text-[0.7rem] sm:text-base md:text-lg price">
               <NavLink to={`/phonedetail/${id}`} className="flex justify-center items-center px-[2px] sm:px-8 w-full h-full">
                  {clean(item.price)} €
               </NavLink>
            </td>

            <td className="xl:group-hover:bg-gray-100 py-2 w-7 md:w-16">
               <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-2">
                  <CartIcon style={"w-4 h-4 sm:w-5 sm:h-5 xl:p-2 xl:w-10 xl:h-10 lg:h-8 lg:w-8"} addToCart={addToCart} item={item} />
                  <div className="group/delete">
                     <DeleteIcon style={"w-4 h-4 sm:w-5 sm:h-5 xl:p-2 xl:w-10 xl:h-10 lg:h-8 lg:w-8"} handleDelete={handleDelete} item={item} />
                  </div>
               </div>
            </td>
         </tr>
      </>
   );
}
