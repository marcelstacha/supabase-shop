import { TrashIcon } from "@heroicons/react/24/outline";
import FavoritesProps from "../interfaces/FavoritesProps";
import CartProps from "../interfaces/CartProps";

interface DeleteIconProps {
   item: CartProps | FavoritesProps;
   style?: string;
   handleDelete?: (itemId: number) => void;
}

export default function DeleteIcon({ handleDelete, item, style }: DeleteIconProps) {

   const id = item.prod_id != undefined ? item.prod_id : item.id

   return (<>
      <TrashIcon
         onClick={() => handleDelete?.(id)}
         className={`p-0 lg:pb-2 lg:pt-1 stroke-red-600 hover:stroke-red-900 cursor-pointer transition  ${style}`}
      />
   </>)
}

