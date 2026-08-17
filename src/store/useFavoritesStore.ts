import { create } from "zustand";
import FavoritesProps from "../interfaces/FavoritesProps";
import { supabase } from "../supabaseClient";
import { useAuthStore } from "./useAuthStore";

interface FavoritesState {
   favorites: FavoritesProps[];
   isLoading: boolean;
   error: string;
   loadedUserId: string | null;
   fetchFavorites: () => Promise<void>;
   toggleFavorite: (id: number) => Promise<void>,
   deleteFavorite: (id: number) => Promise<void>,
}

export const useFavoritesStore = create<FavoritesState>()(function (set, get) {

   return {
      favorites: [] as FavoritesProps[],
      isLoading: true,
      error: "",
      loadedUserId: null,

      async fetchFavorites() {
         const user = useAuthStore.getState().user

         if (!user) {
            set({ favorites: [], isLoading: false, loadedUserId: null })
            return;
         }

         set({ isLoading: true, error: "" })

         const { data, error } = await supabase
            .from("fav_view") //custom view mit gejointen tables
            .select("*")
            .eq("user_id", user.id)
            .order("brand", { ascending: true })
            .order("prod_name", { ascending: true })

         if (data) {
            set({ favorites: data, isLoading: false, loadedUserId: user.id })
         }
         if (error) {
            set({ error: error.message, isLoading: false, loadedUserId: user.id })
         }
      },

      async toggleFavorite(id: number) {
         const user = useAuthStore.getState().user

         if (!user) return

         const isFav = get().favorites.some((fav) => fav.prod_id == id)

         if (isFav) {
            const { error } = await supabase
               .from('favorites')
               .delete()
               .eq("product_id", id)
               .eq("user_id", user.id)
            if (error) {
               console.error(error.message + "Fehler beim Umschalten von Favoriten");
            }
         } else {
            const { error } = await supabase
               .from("favorites")
               .insert({
                  product_id: id,
                  user_id: user.id
               })
            if (error) {
               console.error(error.message)
            }
         }
         //fetchFavorites()
      },

      async deleteFavorite(id: number) {
         const user = useAuthStore.getState().user

         if (!user) return

         set((state) => ({
            favorites: state.favorites ? state.favorites.filter((item) => item.prod_id !== id) : []
         }));

         const { error } = await supabase
            .from('favorites')
            .delete()
            .eq("product_id", id)
            .eq("user_id", user.id)
         if (error) {
            console.error(error.message + "Fehler beim Löschen von Favoriten");
         }
      }
   }

})