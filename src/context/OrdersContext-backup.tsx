import OrdersProps from "../interfaces/OrdersProps"
import { supabase } from "../supabaseClient"
import { useAuth } from "./AuthContext"
import { useCart } from "./CartContext"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface OrdersContextType {
   confirmOrder: () => Promise<void>;
   orders: OrdersProps[][];
   fetchOrders: () => Promise<void>;
   // isLoading: boolean;
   //  error: string;
   //setOrders: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
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

   /*
      async function fetchOrders() {
   
         if (user) {
   
            const { data: idArr } = await supabase
               .from("orders")
               .select("id")
               .eq("user_id", user.id)
   
            if (idArr) {
               //console.log(idArr)
               const arr = []
               for (let i = 0; i < idArr.length; i++) {
   
                  const { data } = await supabase
                     .from("order_view")
                     .select("*")
                     .eq("order_id", idArr[i].id)
   
                  if (data) {
                     arr.push(...data)
   
                  }
   
               }
               setOrders(arr)
               console.log(data)
            }
         }
      }
   */

   async function fetchOrders() {

      if (user) {
         console.log("//// fetch...");
         const { data: idArr } = await supabase
            .from("orders")
            .select("id")
            .eq("user_id", user.id);

         if (idArr) {
            const ordersData: OrdersProps[][] = await Promise.all(
               idArr.map(async (order) => {
                  const { data, error } = await supabase
                     .from("order_view")
                     .select("*")
                     .eq("order_id", order.id)

                  if (error) {
                     console.error(`Fehler beim Abrufen von Order ${order.id}:`, error);
                     return [];
                  }
                  console.log("//// idArr.map...");
                  return data || []
               })
            )
            setOrders(ordersData)
         }
      }
   }

   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

   async function confirmOrder() {

      let orderID: number | null = null

      if (user) {

         const { data: emptyOrder, error: emptyError } = await supabase
            .from("orders")
            .insert({ user_id: user.id })    // order mit user_id einfügen
            .select()

         if (emptyError) {
            console.log(emptyError)
         }
         if (emptyOrder && emptyOrder.length > 0) {
            orderID = emptyOrder[0].id    // order_id zwischenspeichern
         }

         const sqlData = cart.map((item) => ({ order_id: orderID, prod_id: item.prod_id, user_id: user.id }));

         const { data, error } = await supabase
            .from("order_details")
            .insert(sqlData)
            .eq("order_id", orderID)

         console.log(data, error, "orderid " + orderID)
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
