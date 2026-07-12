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
            <div className="flex items-end text-[0.65rem] sm:text-base md:text-lg lg:text-lg">
               <span><b>{order.brand}</b></span>
               <span>{order.name}</span>
            </div>
            <span className="text-[0.65rem] sm:text-base md:text-lg lg:text-lg price">{formatPrice(order.price)}</span>
         </div>
         <hr className="h-[2px] bg-gray-400" />
      </div>
   )
}