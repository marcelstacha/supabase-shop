import { useNavigate } from "react-router-dom";
import FavoritesProps from "../interfaces/FavoritesProps";
import { clean } from "../utils/utils";
import CartIcon from "./ui/CartIcon";
import DeleteIcon from "./ui/DeleteIcon";

import { useCartStore } from "../store/useCartStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function FavoriteRow({ item }: { item: FavoritesProps }) {
   const addToCart = useCartStore((state) => state.addToCart);
   const deleteFavorite = useFavoritesStore((state) => state.deleteFavorite);

   const navigate = useNavigate();

   function handleDelete(id: number) {
      deleteFavorite(id);
   }
   //phonedetail/${item.prod_id}

   function handleClick() {
      navigate(`../phonedetail/${item.prod_id}`);
   }

   return (
      <>
         <tr
            key={item.fav_id}
            className="group w-full text-xs lg:text-base cursor-pointer"
            onClick={handleClick}
         >
            <td className="xl:group-hover:bg-accent/5 pr-0 pl-0 size-10 sm:size-16 md:size-20 xl:size-20">
               <img
                  className="hover:brightness-105 m-auto p-[2px] sm:py-2 size-full xl:size-24 object-contain transition"
                  src={`${item.img}-1.jpg`}
                  alt={`${item.prod_name}`}
               />
            </td>
            <td className="xl:group-hover:bg-accent/5 p-0">
               <div className="flex min-[470px]:flex-row flex-col justify-center min-[470px]:gap-1 px-[2px] min-[470px]:px-2 md:px-4 w-full leading-4">
                  <span className="px-0 py-0 font-bold text-xs min-[470px]:text-sm sm:text-base">
                     {item.brand}
                  </span>
                  <span className="px-0 py-0 text-xs min-[470px]:text-sm sm:text-base">
                     {item.prod_name}
                  </span>
               </div>
            </td>
            <td className="hidden lg:table-cell xl:group-hover:bg-accent/5">
               {item.screen}"
            </td>
            <td className="hidden xl:table-cell xl:group-hover:bg-accent/5">
               {item.soc}
            </td>
            <td className="hidden lg:table-cell xl:group-hover:bg-accent/5">
               {item.battery}mAh
            </td>
            <td className="hidden 2xl:table-cell xl:group-hover:bg-accent/5 w-16">
               {item.charging}W
            </td>
            <td className="hidden 2xl:table-cell xl:group-hover:bg-accent/5 w-16">
               {item.charging_wireless && item.charging_wireless > 0
                  ? item.charging_wireless + "W"
                  : "❌"}
            </td>
            <td className="xl:group-hover:bg-accent/5 px-[2px] sm:px-8 w-[4.5rem] text-[0.7rem] sm:text-base md:text-lg price">
               {clean(item.price)} €
            </td>

            <td
               className="xl:group-hover:bg-gray-500/5 py-2 w-7 md:w-16"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-2">
                  <CartIcon
                     style={
                        "w-4 h-4 sm:w-5 sm:h-5 xl:p-2 xl:w-10 xl:h-10 lg:h-8 lg:w-8"
                     }
                     addToCart={addToCart}
                     item={item}
                  />

                  <DeleteIcon
                     style={
                        "w-4 h-4 sm:w-5 sm:h-5 xl:p-2 xl:w-10 xl:h-10 lg:h-8 lg:w-8"
                     }
                     handleDelete={handleDelete}
                     item={item}
                  />
               </div>
            </td>
         </tr>
      </>
   );
}
