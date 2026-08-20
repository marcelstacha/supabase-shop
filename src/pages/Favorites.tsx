import { useEffect } from "react";
import FavoriteList from "../components/FavoriteList";
import Heading from "../components/layout/Heading";
import QuantityDisplay from "../components/ui/QuantityDisplay";

import { useFavoritesStore } from "../store/useFavoritesStore";
import { useAuthStore } from "../store/useAuthStore";
import RedirectButton from "../components/ui/RedirectButton";
import Loading from "../components/ui/Loading";

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
         {user && isLoading && favorites.length == 0 ?
            <Loading />
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
                  ?
                  <RedirectButton
                     clickPath={"phonegrid"}
                     text={["Keine gespeicherten Favoriten.", "Favoriten finden"]}
                  />
                  :
                  <RedirectButton
                     clickPath={"user"}
                     text={["Nur angemeldete Nutzer können Favoriten hinzufügen.", "Anmelden"]}
                  />
               ))}
      </div>
   </>)
}