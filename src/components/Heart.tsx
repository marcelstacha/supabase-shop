import React, { useEffect, useMemo, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/useAuthStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface HeartProps {
   id: number;
   isPreview?: boolean;
}

export default function Heart({ id, isPreview = true }: HeartProps) {
   const [canToggle, setCanToggle] = useState(true)

   const favorites = useFavoritesStore((state) => state.favorites)
   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

   const user = useAuthStore((state) => state.user)

   const isFav = useMemo(() => {
      if (!user || !favorites) {
         return false;
      }
      return favorites.some((fav) => fav.prod_id === Number(id));
   }, [favorites, id, user]);

   //optimisticFav für direkte aenderung ohne fetchFavorites, verhindert flackern
   const [optimisticFav, setOptimisticFav] = useState(isFav)

   useEffect(() => {
      setOptimisticFav(isFav);
   }, [isFav]);

   function handleHeart(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
         return
      }

      if (canToggle) {
         setCanToggle(false)

         const prevOptimisticFav = optimisticFav
         setOptimisticFav((prev) => !prev)

         toggleFavorite(id)
            .catch((err) => {
               console.error(err);
               setOptimisticFav(prevOptimisticFav)
            })
            .finally(() => {
               setCanToggle(true)
            });
      }
   }

   let style = "";
   if (isPreview) {
      style = "";
   } else {
      style = "top-0 right-0 sm:h-7 sm:w-7 sm:right-2 sm:top-2 md:h-8 md:w-8 lg:h-9 lg:w-9 lg:right-4 lg:top-3";
   }

   return (
      <>
         <div className="group z-10 relative">
            <HeartIcon
               onClick={(e) => handleHeart(e)}
               className={`h-6 w-6 -top-1 right-1 sm:top-0 sm:right-2 absolute cursor-pointer fill-white transition md:hover:fill-red-300
                           ${optimisticFav ? "!fill-red-500 md:hover:!fill-red-700" : "fill-transparent"}
                           ${style}`
               }
            />
         </div>
      </>
   );
}