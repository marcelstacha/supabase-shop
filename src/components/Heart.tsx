import React, { useEffect, useMemo, useState } from "react";
import { useFavorites } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import { HeartIcon } from "@heroicons/react/24/outline";

interface HeartProps {
   id: number;
   isPreview?: boolean;
}

export default function Heart({ id, isPreview = true }: HeartProps) {
   const [canToggle, setCanToggle] = useState(true)

   const { favorites, toggleFavorite, isLoading } = useFavorites()
   const { user } = useAuth()

   const isFav = useMemo(() => {
      if (!user || !favorites || isLoading) {
         return false;
      }
      return favorites.some((fav) => fav.prod_id === Number(id));
   }, [favorites, id, user, isLoading]);

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
               className={`h-6 w-6 -top-1 right-1 sm:top-0 sm:right-2 absolute cursor-pointer fill-white transition md:hover:!fill-background
                           ${optimisticFav ? "!fill-accent md:hover:!fill-accent/50" : "fill-transparent"}
                           ${style}`
               }
            />
         </div>
      </>
   );
}