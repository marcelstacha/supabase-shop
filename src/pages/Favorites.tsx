import { useEffect } from "react";
import FavoriteList from "../components/FavoriteList";
import Heading from "../components/layout/Heading";
import QuantityDisplay from "../components/ui/QuantityDisplay";

import { useFavoritesStore } from "../store/useFavoritesStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Favorites() {

   const user = useAuthStore((state) => state.user)

   const favorites = useFavoritesStore((state) => state.favorites)
   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)
   const isLoading = useFavoritesStore((state) => state.isLoading)


   useEffect(() => {
      fetchFavorites()
   }, [fetchFavorites, user])

   return (<>
      <Heading>Favoriten</Heading>

      <div className="flex flex-col justify-center items-center p-0 py-1 md:py-8 min-h-20 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         {user && isLoading && favorites.length == 0 ? <span className="flex justify-center text-wrap">Laden...</span>
            : (
               user && favorites.length > 0 ? (
                  <>
                     <QuantityDisplay
                        isCart={false}
                        filtered={favorites}
                        user={user}
                     />
                     <FavoriteList
                        filtered={favorites}
                     />
                  </>
               ) : (user
                  ? <span className="flex justify-center px-3 text-wrap">
                     Keine gespeicherten Favoriten.
                  </span>
                  : <span className="flex justify-center px-3 text-wrap">
                     Nur angemeldete Nutzer können Favoriten hinzufügen.
                  </span>
               ))}
      </div>
   </>)
}