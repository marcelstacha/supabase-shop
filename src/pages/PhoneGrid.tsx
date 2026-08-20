import { AnimatePresence, motion } from "motion/react"
import { useState, ChangeEvent, MouseEvent, useMemo, useEffect } from "react";
import { DevicePhoneMobileIcon, BookOpenIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

import Phone from "../components/Phone"
import Heading from "../components/layout/Heading";
import FilterButton from "../components/ui/FilterButton";
import { useProductsStore } from "../store/useProductsStore";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useAuthStore } from "../store/useAuthStore";

export default function PhoneGrid() {

   const defaultSort = "newest"

   const [sortBy, setSortBy] = useState(defaultSort)
   const [filterBy, setFilterBy] = useState("all")

   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)
   const phones = useProductsStore((state) => state.phones)
   const fetchProducts = useProductsStore((state) => state.fetchProducts)
   const error = useProductsStore((state) => state.error)
   const loadingProducts = useProductsStore((state) => state.isLoading)
   const user = useAuthStore((state) => state.user)


   const { filteredSorted, sortText, filterText } = useMemo(() => {
      let sortText = ""
      let filterText = ""
      let filtered = phones || []

      //filtern
      if (filterBy == "all") {
         filtered = phones || []
         filterText = "Alle"
      }
      else if (filterBy == "default") {
         filtered = (phones.filter((phone) => phone.foldable == false))
         filterText = "Standard"
      }
      else if (filterBy == "foldable") {
         filtered = (phones.filter((phone) => phone.foldable == true))
         filterText = "Faltbar"
      }

      //sortieren
      if (sortBy === "oldest") {
         filtered = filtered.slice().sort((a, b) => a.release.localeCompare(b.release))
         sortText = "Älteste zuerst"
      } else if (sortBy === "newest") {
         filtered = filtered.slice().sort((a, b) => b.release.localeCompare(a.release))
         sortText = "Neueste zuerst"
      }
      else if (sortBy === "name1") {
         filtered = filtered.slice().sort((a, b) => { return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name) });
         sortText = "Name aufsteigend"
      }
      else if (sortBy === "name2") {
         filtered = filtered.slice().sort((a, b) => { return b.brand.localeCompare(a.brand) || b.name.localeCompare(a.name) });
         sortText = "Name absteigend"
      }
      else if (sortBy === "price1") {
         filtered = filtered.slice().sort((a, b) => a.price - b.price)
         sortText = "Preis absteigend"
      }
      else if (sortBy === "price2") {
         filtered = filtered.slice().sort((a, b) => b.price - a.price)
         sortText = "Preis aufsteigend"
      }

      return { filteredSorted: filtered, sortText, filterText }

   }, [phones, filterBy, sortBy])

   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);

   useEffect(() => {
      fetchFavorites();
   }, [fetchFavorites, user]);

   function sortHandler(e: ChangeEvent<HTMLSelectElement>) {
      setSortBy(e.target.value)
   }

   function filterHandler(e: MouseEvent<HTMLButtonElement>) {
      setFilterBy((e.currentTarget as HTMLButtonElement).value);
   }

   return (
      <>
         <Heading>Produkte</Heading>

         <h2
            key={filteredSorted.length}
            className="mb-3 2xl:-mb-14 xl:-mb-[3.25rem] text-sm sm:text-base md:text-lg"
         >
            [{filterText} ({filteredSorted.length}) / {sortText}]
         </h2>
         {error ? (<div className="flex flex-col">
            <span className="my-10 font-bold text-xl">Fehler beim Abrufen der Produkte</span>
            <span>{error}</span>
         </div>) : loadingProducts && phones.length == 0 ? (<span className="my-10 font-bold text-xl">Lade Produkte</span>)
            : <>
               <div className="flex flex-row justify-between items-center lg:mx-auto my-1 sm:my-4 sm:mb-2 w-full">

                  <div className="flex items-center gap-1">

                     <FilterButton
                        filterBy={filterBy}
                        filterHandler={filterHandler}
                        value="all"
                     >
                        <span className="flex flex-row">
                           <span className="p-0 w-fit sm:w-8 h-4 sm:h-6 md:h-fit">Alle</span>
                        </span>
                     </FilterButton>

                     <FilterButton
                        filterBy={filterBy}
                        filterHandler={filterHandler}
                        value="default"
                     >
                        <span className="flex flex-row justify-around items-center md:w-28">
                           <DevicePhoneMobileIcon
                              className="w-4 sm:w-8 h-4 sm:h-6"
                           />
                           <span className="hidden md:block p-0">Standard</span>
                        </span>
                     </FilterButton>

                     <FilterButton
                        filterBy={filterBy}
                        filterHandler={filterHandler}
                        value="foldable"
                     >
                        <span className="flex flex-row justify-around items-center md:w-28">
                           <BookOpenIcon
                              className="w-4 sm:w-8 h-4 sm:h-6"
                           />
                           <span className="hidden md:block p-0">Faltbar</span>
                        </span>
                     </FilterButton>

                  </div>

                  <div className="relative">
                     <select
                        title="sort-select"
                        defaultValue={defaultSort}
                        onChange={(e) => sortHandler(e)}
                        className="py-2 pr-8 sm:pr-12 pl-2 sm:pl-6 w-full lg:w-auto h-[50px] sm:h-[60px] 2xl:h-[70px] text-[0.72rem] text-gray-900 sm:text-base bg-white hover:bg-gray-200 border border-gray-900 rounded-lg appearance-none"
                     >
                        <option value="name1">Name A-Z</option>
                        <option value="name2">Name Z-A</option>
                        <option value="newest">Neueste zuerst</option>
                        <option value="oldest">Älteste zuerst</option>
                        <option value="price1">Preis aufsteigend</option>
                        <option value="price2">Preis absteigend</option>
                     </select>
                     <ChevronDownIcon
                        className="top-5 sm:top-6 2xl:top-7 right-3 absolute w-3 sm:w-4 h-3 sm:h-4 text-gray-900 stroke-2 -translate-y-1/2 pointer-events-none"
                     />
                  </div>
               </div>
               <div className="min-h-40">
                  <ul className="inline-grid gap-1 sm:gap-2 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
                     <AnimatePresence >
                        {filteredSorted.map((phone) => (
                           <motion.li
                              key={phone.id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ type: "tween", duration: 0.17, ease: "easeInOut" }}
                              className="group cursor-pointer"
                           >
                              <NavLink to={`/phonedetail/${phone.id}`}>
                                 <Phone {...phone} />
                              </NavLink>
                           </motion.li>
                        ))}
                     </AnimatePresence>
                  </ul>
               </div>
            </>}
      </>)
}
