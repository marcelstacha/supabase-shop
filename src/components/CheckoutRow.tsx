import CartProps from "../interfaces/CartProps";
import { formatPrice } from "../utils/utils";

export default function CartRow({ item }: { item: CartProps }) {

   return (<>
      <tr
         key={item.id}
         className="text-[0.65rem] sm:text-base"
      >
         <td className="w-40 sm:w-60 md:w-64 text-left">
            <div className="flex px-0 sm:pr-4 lg:text-base leading-3 sm:leading-8 lg:leading-10">
               <span className="font-bold sm:text-base">{item.brand}</span>
               <span className="font-medium sm:text-base">{item.name}</span>
            </div>
         </td>
         <td className="pl-2 sm:pl-4 text-right price">
            {formatPrice(item.price)}
         </td>
      </tr>
   </>)
}