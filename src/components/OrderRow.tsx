import OrdersProps from "../interfaces/OrdersProps";
import { formatPrice } from "../utils/utils";

interface OrderRowProps {
   order: OrdersProps
}

export default function OrderRow({ order }: OrderRowProps) {

   return (
      <div className="group">
         <div
            className="flex justify-between items-center"
            key={order.id}
         >
            <div className="flex items-end min-w-0 text-[0.65rem] min-[500px]:text-[0.8rem] sm:text-base md:text-lg lg:text-lg">
               <span className="shrink-0"><b>
                  {order.brand}
               </b></span>
               <span className="min-w-0 truncate">
                  {order.name}
               </span>
            </div>
            <span className="text-[0.65rem] min-[500px]:text-[0.8rem] sm:text-base md:text-lg lg:text-lg price shrink-0">{formatPrice(order.price)}</span>
         </div>
         <hr className="h-[2px] bg-gray-400" />
      </div>
   )
}