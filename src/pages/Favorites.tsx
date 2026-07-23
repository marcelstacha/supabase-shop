import { useEffect, useState } from "react";
import FavoriteList from "../components/FavoriteList";
import PageHeading from "../components/PageHeading";
import QuantityDisplay from "../components/QuantityDisplay";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Favorites() {

   const user = useAuthStore((state) => state.user)

   const favorites = useFavoritesStore((state) => state.favorites)
   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)
   const isLoading = useFavoritesStore((state) => state.isLoading)

   const [filtered, setFiltered] = useState(favorites || [])

   function optimisticUpdate(id: number) {
      setFiltered((prev) => prev.filter((item) => (item.prod_id != id)))
   }

   useEffect(() => {
      fetchFavorites()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      setFiltered(favorites)
   }, [favorites]);

   return (<>
      <PageHeading>Favoriten</PageHeading>

      <div className="flex flex-col justify-center items-center p-0 py-1 md:py-10 min-h-20 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         {user && isLoading ? <span className="flex justify-center text-wrap">Laden...</span>
            : (
               user && filtered.length > 0 ? (
                  <>
                     <QuantityDisplay
                        isCart={false}
                        filtered={filtered}
                        user={user}
                     />
                     <FavoriteList
                        filtered={filtered}
                        optimisticUpdate={optimisticUpdate}
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