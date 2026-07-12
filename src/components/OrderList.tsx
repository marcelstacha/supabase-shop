import { useOrders } from "../context/OrdersContext";
import OrderSingle from "./OrderSingle";

export default function OrderList() {
   const { orders } = useOrders();

   if (!Array.isArray(orders)) {
      return <p className="text-red-500 text-center">Fehler: Bestellungen konnten nicht geladen werden.</p>;
   }

   return (
      <div className="relative h-[24rem] sm:h-[32rem]">
         <div className="pb-14 h-full overflow-y-auto">
            {orders.length > 0 && (
               orders.slice().reverse().map((item) => (
                  <OrderSingle key={item[0]?.id} item={item} />
               ))
            )}
         </div>
         <div className="bottom-0 left-0 absolute w-full h-20 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"></div>
      </div>
   );
}
