
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./AuthContext";
import FavoritesProps from "../interfaces/FavoritesProps";

interface FavoriteContextType {
   favorites: FavoritesProps[];
   isLoading: boolean;
   error: string;
   fetchFavorites: () => Promise<void>;
   toggleFavorite: (id: number) => Promise<void>,
   deleteFavorite: (id: number) => Promise<void>,
}

interface FavoriteProviderProps {
   children: ReactNode;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {

   const [favorites, setFavorites] = useState<FavoritesProps[]>([]);
   const [error, setError] = useState("")
   const [isLoading, setIsLoading] = useState(true);

   const { user } = useAuth();

   useEffect(() => {
      fetchFavorites()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user])

   async function fetchFavorites() {
      if (!user) {
         setFavorites([]);
         setIsLoading(false);
         return;
      }

      setIsLoading(true);
      setError("");

      const { data, error } = await supabase
         .from("fav_view") //custom view mit gejointen tables
         .select("*")
         .eq("user_id", user.id)
         .order("brand", { ascending: true })
         .order("prod_name", { ascending: true })

      if (data) setFavorites(data)
      if (error) setError(error.message)
      setIsLoading(false);
   };

   async function toggleFavorite(id: number) {

      if (!user) return

      const isFav = favorites.some((fav) => fav.prod_id == id)

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
   }

   async function deleteFavorite(id: number) {
      if (!user) return
      const { error } = await supabase
         .from('favorites')
         .delete()
         .eq("product_id", id)
         .eq("user_id", user.id)
      if (error) {
         console.error(error.message + "Fehler beim Löschen von Favoriten");
      }
   }

   return (
      <FavoriteContext.Provider value={{ favorites, toggleFavorite, error, isLoading, fetchFavorites, deleteFavorite }}>
         {children}
      </FavoriteContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = (): FavoriteContextType => {
   const context = useContext(FavoriteContext);

   if (context === undefined) {
      throw new Error("useFavorites FavoriteContext Fehler");
   }

   return context;
};