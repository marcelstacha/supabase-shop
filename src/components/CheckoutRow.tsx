import CartProps from "../interfaces/CartProps";
import { formatPrice } from "../utils/utils";

interface CheckoutRowProps {
   item: CartProps;
   index: number;
}

export default function CheckoutRow({ item, index }: CheckoutRowProps) {
   console.log(item);
   return (
      <>
         <tr key={item.prod_id} className="text-[0.65rem] sm:text-base lg:text-lg">
            <td className="hidden min-[400px]:table-cell">{index + 1}</td>
            <td className="w-full max-w-0 text-left">
               <div className="flex px-0 leading-3 sm:leading-8 lg:leading-10">
                  <span className="font-bold shrink-0">{item.brand}</span>
                  <span className="min-w-0 font-medium truncate">{item.name}</span>
               </div>
            </td>
            <td className="px-4 pr-5 pl-2 sm:pl-4 text-right whitespace-nowrap price">{formatPrice(item.price)}</td>
         </tr>
      </>
   );
}
