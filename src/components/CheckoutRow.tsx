import CartProps from "../interfaces/CartProps";
import { formatPrice } from "../utils/utils";

export default function CartRow({ item }: { item: CartProps }) {

   return (<>
      <tr
         key={item.id}
         className="text-[0.65rem] sm:text-base lg:text-lg"
      >
         <td className="text-left">
            <div className="flex px-0 leading-3 sm:leading-8 lg:leading-10">
               <span className="font-bold">{item.brand}</span>
               <span className="font-medium">{item.name}</span>
            </div>
         </td>
         <td className="pl-2 sm:pl-4 text-right price">
            {formatPrice(item.price)}
         </td>
      </tr>
   </>)
}