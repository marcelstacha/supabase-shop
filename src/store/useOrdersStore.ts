import { create } from "zustand";
import OrdersProps from "../interfaces/OrdersProps";
import { supabase } from "../supabaseClient";
import { useAuthStore } from "./useAuthStore";
import { useCartStore } from "./useCartStore";

interface OrdersState {
   orders: OrdersProps[][];
   confirmOrder: () => Promise<void>;
   fetchOrders: () => Promise<void>;
}

export const useOrdersStore = create<OrdersState>()(function (set, get) {
   return {
      orders: [] as OrdersProps[][],

      async fetchOrders() {
         const user = useAuthStore.getState().user

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

               set({ orders: groupedOrders })
            }
         }
      },

      async confirmOrder() {
         const user = useAuthStore.getState().user
         const cart = useCartStore.getState().cart
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
               else { await get().fetchOrders() }
            }
         }
      }

   }

})