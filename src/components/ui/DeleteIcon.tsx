import { TrashIcon } from "@heroicons/react/24/outline";
import CartProps from "../../interfaces/CartProps";
import FavoritesProps from "../../interfaces/FavoritesProps";

interface DeleteIconProps {
   item: CartProps | FavoritesProps;
   style?: string;
   handleDelete?: (itemId: number) => void;
}

export default function DeleteIcon({ handleDelete, item, style }: DeleteIconProps) {
   const id = item.prod_id;

   return (
      <>
         <TrashIcon
            onClick={() => handleDelete?.(id)}
            className={`p-0 lg:pb-2 lg:pt-1 stroke-red-400 will-change-transform group-hover/delete:stroke-red-700 group-hover/delete:scale-110 cursor-pointer transition  ${style}`}
         />
      </>
   );
}
