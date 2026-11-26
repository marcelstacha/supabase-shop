import React, { useState } from "react";
import OrdersProps from "../interfaces/OrdersProps";
import { SHIPPING_COST } from "../utils/constants";
import { formatPrice } from "../utils/utils";
import OrderRow from "./OrderRow";

interface OrderSingleProps {
   item: OrdersProps[];
}

export default function OrderSingle({ item }: OrderSingleProps) {
   const [isOpen, setIsOpen] = useState(false);

   const sum = item.reduce((acc, order) => acc + order.price, SHIPPING_COST);

   function handleOpen() {
      setIsOpen((prev) => !prev);
   }

   return (
      <>
         <div
            className="order-grouped bg-white hover:bg-gray-100 mb-4 p-2 md:p-4 md:px-6 rounded-lg text-xs md:text-sm leading-[1.1] cursor-pointer"
            onClick={handleOpen}
            key={item[0].order_id}
         >
            {item.map((order, index) => {
               let dateString = order.created_at.substring(0, 10);
               const date = new Date(dateString);
               dateString = date.toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
               });

               return (
                  <React.Fragment key={order.id}>
                     <div>
                        {index == 0 && (
                           <>
                              <div className="flex justify-center gap-1 my-1">
                                 <span>
                                    <b>#{order.order_id}</b>
                                 </span>
                                 <span>({dateString})</span>
                              </div>
                              {isOpen && <hr className="bg-gray-600 hover:bg-gray-900 mb-4 h-[2px]" />}
                           </>
                        )}
                        {isOpen && (
                           <>
                              <OrderRow key={order.id} order={order} />

                              {item.length - 1 == index && (
                                 <>
                                    <div className="flex flex-row justify-end gap-2 mt-2 text-[0.65rem] sm:text-base md:text-lg lg:text-lg">
                                       <span>Versand:</span>
                                       <span className="font-bold price">+ {formatPrice(SHIPPING_COST)}</span>
                                    </div>
                                    <hr className="bg-gray-600 hover:bg-gray-900 my-2 h-[2px]" />
                                    <div className="flex flex-row justify-end gap-2 md:mt-4 mr-1 text-[0.65rem] sm:text-base md:text-lg lg:text-xl">
                                       <div>Gesamt:</div>
                                       <div className="font-bold underline price">{formatPrice(sum)}</div>
                                    </div>
                                 </>
                              )}
                           </>
                        )}
                     </div>
                  </React.Fragment>
               );
            })}
         </div>
      </>
   );
}
