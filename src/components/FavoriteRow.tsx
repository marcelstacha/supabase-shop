import { NavLink } from "react-router-dom";
import FavoritesProps from "../interfaces/FavoritesProps";
import { clean } from "../utils/utils"
import DeleteIcon from "./DeleteIcon";
import CartIcon from "./CartIcon";
import { useCartStore } from "../store/useCartStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function FavoriteRow({ item, update }: { item: FavoritesProps, update: (id: number) => void }) {

   const addToCart = useCartStore((state) => state.addToCart)
   const deleteFavorite = useFavoritesStore((state) => state.deleteFavorite)

   function handleDelete(id: number) {
      deleteFavorite(id)
      update(id)
   }

   return (<>
      <tr key={item.fav_id} className="text-xs lg:text-base">
         <td className="pr-0 pl-0">
            <NavLink to={`/phonedetail/${item.prod_id}`}>
               <img
                  className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 object-contain hover:brightness-125 transition"
                  src={`${item.img}-1.jpg`}
                  alt={`${item.prod_name}`}
               />
            </NavLink>
         </td>
         <td className="p-0">
            <div className="flex sm:flex-row flex-col justify-center sm:gap-1 w-[6.4rem] sm:w-56 lg:w-56 leading-4">
               <span className="px-0 font-bold sm:text-base">{item.brand}</span>
               <span className="px-0 sm:text-base">{item.prod_name}</span>
            </div>
         </td>
         <td className="hidden lg:table-cell">{item.screen}"</td>
         <td className="hidden xl:table-cell">{item.soc}</td>
         <td className="hidden lg:table-cell">{item.battery}mAh</td>
         <td className="hidden xl:table-cell w-16">{item.charging}W</td>
         <td className="hidden xl:table-cell w-16">{item.charging_wireless && item.charging_wireless > 0 ? item.charging_wireless + "W" : "❌"}</td>
         <td className="px-1 sm:px-8 w-[4.5rem] text-[0.7rem] sm:text-base md:text-lg price">{clean(item.price)} €</td>

         <td className="p-0 sm:p-1 w-7 md:w-16">
            <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-2 px-2 py-1">

               <CartIcon
                  style={"w-6 h-6 sm:w-7 sm:h-7"}
                  addToCart={addToCart}
                  item={item}
               />

               <DeleteIcon
                  style={"w-6 h-6 sm:w-7 sm:h-7"}
                  handleDelete={handleDelete}
                  item={item}
               />
            </div>
         </td>
      </tr>
   </>)
}