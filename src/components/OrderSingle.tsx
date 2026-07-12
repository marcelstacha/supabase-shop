import { useState } from "react";
import OrderRow from "./OrderRow";
import React from "react";
import { formatPrice, offsetID } from "../utils/utils";
import OrdersProps from "../interfaces/OrdersProps";

interface OrderSingleProps {
   item: OrdersProps[]
}

export default function OrderSingle({ item }: OrderSingleProps) {
   const [isOpen, setIsOpen] = useState(false)

   const sum = item.reduce((acc, order) => acc + order.price, 4.99)

   function handleOpen() {
      setIsOpen((prev) => !prev)
   }

   return (<>
      <div className="order-grouped mb-4 p-2 md:p-4 md:px-6 text-xs md:text-sm leading-[1.1] bg-white hover:bg-gray-100 rounded-lg cursor-pointer"
         onClick={handleOpen}
         key={item[0].order_id}
      >
         {item.map((order, index) => {
            let dateString = order.created_at.substring(0, 10)
            const date = new Date(dateString);
            dateString = date.toLocaleDateString('de-DE', {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit'
            });

            return (
               <React.Fragment key={order.id}>
                  <div>
                     {index == 0
                        && <>
                           <div
                              className="flex justify-center gap-1 my-1"
                           >
                              <span><b>#{offsetID(order.order_id)}</b></span>
                              <span>({dateString})</span>
                           </div>
                           {isOpen &&
                              <hr className="mb-4 h-[2px] bg-gray-600 hover:bg-gray-900" />
                           }
                        </>
                     }
                     {isOpen && (<>

                        <OrderRow
                           key={order.id}
                           order={order}
                        />

                        {item.length - 1 == index && <>
                           <div className="flex flex-row justify-end gap-2 mt-2 text-[0.65rem] sm:text-base md:text-lg lg:text-lg">
                              <span>Versand:</span>
                              <span className="font-bold price">+4,99 €</span>
                           </div>
                           <hr className="my-2 h-[2px] bg-gray-600 hover:bg-gray-900" />
                           <div className="flex flex-row justify-end gap-2 md:mt-4 mr-1 text-[0.65rem] sm:text-base md:text-lg lg:text-xl">
                              <div>Gesamt:</div>
                              <div className="font-bold underline price">{formatPrice(sum)}</div>
                           </div>
                        </>}

                     </>)
                     }
                  </div>
               </React.Fragment>
            )
         })}
      </div >
   </>)
}