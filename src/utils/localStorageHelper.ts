import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

const name = "local-cart";

export function getLocalArray(): number[] {
   const local = localStorage.getItem(name);
   if (local && local !== undefined) {
      try {
         return JSON.parse(local);
      } catch (error) {
         console.error(error);
         return [];
      }
   } else {
      return [];
   }
}

export function clearLocalIDs() {
   localStorage.setItem(name, "[]");
}

export function setLocalStorage(id: number) {
   const currentArray = getLocalArray();
   if (!currentArray.includes(id)) {
      const newArray = [...currentArray, id];
      localStorage.setItem(name, JSON.stringify(newArray));
      window.dispatchEvent(new Event('ls-updated'));
   }
}

export function removeFromLocal(id: number) {
   const currentArray = getLocalArray();
   if (currentArray.includes(id)) {
      const newArray = currentArray.filter((item) => item != id);
      localStorage.setItem(name, JSON.stringify(newArray));
   }
}

export async function checkIsInCart(id: number, user: User) {
   const { data, error } = await supabase
      .from("cart_view")
      .select("*")
      .eq("user_id", user.id)
      .eq("prod_id", id);

   if (error) {
      console.log(error.message);
   }
   if (data && data.length > 0) {
      return true;
   } else {
      return false;
   }
}

export async function syncDBCart(user: User) {
   const local = localStorage.getItem(name);
   if (local && local.length > 0) {
      try {
         const localParse = JSON.parse(local);
         if (localParse.length > 0 && user) {
            await Promise.all(
               localParse.map(async (id: number) => {
                  const isInCart = await checkIsInCart(id, user);
                  if (!isInCart) {
                     await supabase
                        .from("cart")
                        .insert({
                           user_id: user.id.toString(),
                           prod_id: Number(id),
                        });
                  }
               })
            );
            clearLocalIDs()
         }
      } catch (error) {
         console.error(error)
      }
   }
}
