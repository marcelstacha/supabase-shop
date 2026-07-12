import OrdersProps from "../interfaces/OrdersProps"
import { supabase } from "../supabaseClient"
import { useAuth } from "./AuthContext"
import { useCart } from "./CartContext"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface OrdersContextType {
   orders: OrdersProps[][];
   confirmOrder: () => Promise<void>;
   fetchOrders: () => Promise<void>;
}

interface OrdersProviderProps {
   children: ReactNode;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export const OrdersProvider = ({ children }: OrdersProviderProps) => {

   const { user } = useAuth()
   const { cart } = useCart()

   const [orders, setOrders] = useState<OrdersProps[][]>([])

   useEffect(() => {
      fetchOrders()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   async function fetchOrders(): Promise<void> {

      if (user) {
         const { data, error } = await supabase
            .from("order_view")
            .select("*")
            .eq("user_id", user.id)

         if (error) {
            console.error(`Fehler beim Abrufen`, error);
         }
         if (data) {
            const groupedOrders = Object.values(
               data.reduce<Record<string, OrdersProps[]>>((acc, order: OrdersProps) => {
                  if (!acc[order.order_id]) {
                     acc[order.order_id] = [];
                  }
                  acc[order.order_id].push(order);
                  return acc;
               }, {})
            )

            setOrders(groupedOrders)
         }
      }
   }

   async function confirmOrder() {

      let orderID: number | null = null

      if (user) {

         const { data: emptyOrder, error: emptyError } = await supabase
            .from("orders")
            .insert({ user_id: user.id })    // order mit user_id einfügen
            .select()

         if (emptyError) console.error(emptyError)

         if (emptyOrder && emptyOrder.length > 0) {
            orderID = emptyOrder[0].id    // order_id zwischenspeichern
         }
         if (orderID) {
            const sqlData = cart.map((item) => ({ order_id: orderID, prod_id: item.prod_id, user_id: user.id }));

            const { error } = await supabase
               .from("order_details")
               .insert(sqlData)
            //.eq("order_id", orderID)
            if (error) console.error(error, "orderid " + orderID)
            else { await fetchOrders() }
         }
      }
   }

   return (
      <OrdersContext.Provider value={{ confirmOrder, orders, fetchOrders }}>
         {children}
      </OrdersContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = (): OrdersContextType => {
   const context = useContext(OrdersContext)

   if (context === undefined) {
      throw new Error("useOrders error")
   }
   return context
}
