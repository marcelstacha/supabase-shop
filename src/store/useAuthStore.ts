import { User, AuthError } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../supabaseClient";
import { clearLocalIDs } from "../utils/localStorageHelper";
import { FormEvent } from "react";
import { useCartStore } from "./useCartStore";

type AuthState = {
   user: User | null;
   error: AuthError | undefined;
   isSyncingCart: boolean;

   setIsSyncingCart: (isSyncingCart: boolean) => void;
   fetchUser: () => Promise<void>
   login: (e: FormEvent) => Promise<void>;
   logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(function (set) {

   return {
      user: null,
      error: undefined,
      isSyncingCart: false,

      setIsSyncingCart: (isSyncingCart) => set({ isSyncingCart: isSyncingCart }),

      async fetchUser() {
         const { data: { session } } = await supabase.auth.getSession();
         set({ user: session?.user || null })
      },

      async login(e) {
         e.preventDefault();

         const form = e.target as HTMLFormElement;
         const email = form.email.value;
         const password = form.password.value;

         try {
            const { data, error } = await supabase.auth.signInWithPassword({
               email,
               password,
            });
            if (error) {
               console.error("Login fehlgeschlagen -", error);
               set({ error: error });
            } else if (data) {
               set({ error: undefined, user: data.user });
               console.log(`%cLogin erfolgreich`, `color: #55FF00`)
            }
         } catch (e) {
            console.error(e as AuthError);
         } finally {
            form.reset();
         }
      },

      async logout() {
         await supabase.auth.signOut();
         set({ user: null });
         clearLocalIDs();
         useCartStore.setState({ cart: [], filtered: [] })
      }

   }
})