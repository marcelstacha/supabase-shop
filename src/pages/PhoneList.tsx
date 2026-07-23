import { AnimatePresence, motion } from "motion/react"
import { useState, ChangeEvent, MouseEvent, useMemo, useEffect } from "react";
import { DevicePhoneMobileIcon, BookOpenIcon } from "@heroicons/react/24/outline";

import PhoneProps from "../interfaces/PhoneProps"

import PageHeading from "../components/PageHeading";

import FilterButton from "../components/FilterButton";
import Row from "../components/Row";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useProductsStore } from "../store/useProductsStore";

export default function PhoneList() {

   const defaultSort = "newest"

   const [sortBy, setSortBy] = useState(defaultSort)
   const [filterBy, setFilterBy] = useState("all")

   const phones = useProductsStore((state) => state.phones)
   const error = useProductsStore((state) => state.error)
   const loadingProducts = useProductsStore((state) => state.isLoading)

   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)

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
         filtered = (phones.filter((phone: PhoneProps) => phone.foldable == false))
         filterText = "Standard"
      }
      else if (filterBy == "foldable") {
         filtered = (phones.filter((phone: PhoneProps) => phone.foldable == true))
         filterText = "Faltbar"
      }

      //sortieren
      if (sortBy === "oldest") {
         filtered = filtered.slice().sort((a: { release: string }, b: { release: string }) => a.release.localeCompare(b.release))
         sortText = "Älteste zuerst"
      } else if (sortBy === "newest") {
         filtered = filtered.slice().sort((a: { release: string }, b: { release: string }) => b.release.localeCompare(a.release))
         sortText = "Neueste zuerst"
      }
      else if (sortBy === "name1") {
         filtered = filtered.slice().sort((a: { brand: string; name: string }, b: { brand: string; name: string }) => { return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name) });
         sortText = "Name aufsteigend"
      }
      else if (sortBy === "name2") {
         filtered = filtered.slice().sort((a: { brand: string; name: string }, b: { brand: string; name: string }) => { return b.brand.localeCompare(a.brand) || b.name.localeCompare(a.name) });
         sortText = "Name absteigend"
      }
      else if (sortBy === "price1") {
         filtered = filtered.slice().sort((a: { price: number }, b: { price: number }) => a.price - b.price)
         sortText = "Preis absteigend"
      }
      else if (sortBy === "price2") {
         filtered = filtered.slice().sort((a: { price: number }, b: { price: number }) => b.price - a.price)
         sortText = "Preis aufsteigend"
      }

      return { filteredSorted: filtered, sortText, filterText }

   }, [phones, filterBy, sortBy])

   useEffect(() => {
      fetchFavorites();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


   function sortHandler(e: ChangeEvent<HTMLSelectElement>) {
      setSortBy(e.target.value)
   }

   function filterHandler(e: MouseEvent<HTMLButtonElement>) {
      setFilterBy((e.target as HTMLButtonElement).value);
   }

   return (
      <>
         <PageHeading>Produktliste</PageHeading>

         <h2
            key={filteredSorted.length}
            className="-mt-4 xl:-mb-12 text-sm sm:text-base md:text-lg transition-all xl:mt:0"
         >
            [{filterText} ({filteredSorted.length}) / {sortText}]
         </h2>
         {error ? <div className="flex flex-col">
            <span className="my-10 font-bold text-xl">Fehler beim Abrufen der Produkte</span>
            <span>{error}</span>
         </div> : !loadingProducts &&
         <>

            <div className="flex flex-row justify-between items-center lg:mx-auto my-4 w-full lg:w-[49rem] 2xl:w-[73.6rem] xl:w-[55rem] transition-all">

               <div className="flex items-center gap-1">

                  <FilterButton
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="all"
                  >
                     Alle
                  </FilterButton>
                  <FilterButton
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="default"
                  >
                     Standard
                  </FilterButton>
                  <FilterButton
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="foldable"
                  >
                     Faltbar
                  </FilterButton>

                  <FilterButton
                     isMobile={true}
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="all"
                  >
                     <span className="m-0 p-0 w-4 sm:w-6 h-4 sm:h-6 pointer-events-none">Alle</span>
                  </FilterButton>

                  <FilterButton
                     isMobile={true}
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="default"
                  >
                     <DevicePhoneMobileIcon
                        className="w-4 sm:w-6 h-4 sm:h-6 pointer-events-none"
                     />
                  </FilterButton>

                  <FilterButton
                     isMobile={true}
                     filterBy={filterBy}
                     filterHandler={filterHandler}
                     value="foldable"
                  >
                     <BookOpenIcon
                        className="w-4 sm:w-6 h-4 sm:h-6 pointer-events-none"
                     />
                  </FilterButton>

               </div>

               <div className="ml-1">
                  <select
                     title="sort-select"
                     defaultValue={defaultSort}
                     onChange={(e) => sortHandler(e)}
                     className="sm:p-[0.63rem] md:px-6 py-2 pl-2 w-full lg:w-auto text-[0.72rem] text-gray-900 sm:text-base bg-white hover:bg-gray-200 border border-gray-900 rounded-md"
                  >
                     <option value="name1">Name A-Z</option>
                     <option value="name2">Name Z-A</option>
                     <option value="newest">Neueste zuerst</option>
                     <option value="oldest">Älteste zuerst</option>
                     <option value="price1">Preis aufsteigend</option>
                     <option value="price2">Preis absteigend</option>
                  </select>
               </div>
            </div>
            <AnimatePresence>
               <div className="pb-4 w-full max-h-[61vh] md:max-h-[65vh] overflow-x-auto shadow-sm">
                  <table className="w-max max-w-none text-xs sm:text-sm md:text-lg text-left bg-white">
                     <thead className="text-xs sm:text-sm">
                        <tr>
                           <th>Bild</th>
                           <th className="sm:w-40">Name</th>
                           <th className="lg:table-cell px-2 text-center">Bildschirm</th>
                           <th className="xl:table-cell text-center">SOC</th>
                           <th className="lg:table-cell w-28 text-center">Akku</th>
                           <th className="xl:table-cell text-center">Laden</th>
                           <th className="xl:table-cell text-center">Kabellos</th>
                           <th className="xl:table-cell text-center">Datum</th>
                           <th className="xl:table-cell text-center">Gewicht</th>
                           <th className="xl:table-cell text-center">Faltbar</th>
                           <th className="xl:table-cell text-center">Höhe</th>
                           <th className="xl:table-cell text-center">Breite</th>
                           <th className="xl:table-cell text-center">Tiefe</th>
                           <th className="xl:table-cell text-center">Preis</th>
                           <th></th>
                        </tr>
                     </thead>
                     <motion.tbody
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                     >
                        {filteredSorted.map((item: PhoneProps) => (
                           <Row
                              key={item.id}
                              item={item}
                           />
                        ))}

                     </motion.tbody>
                  </table>
               </div>
            </AnimatePresence>
         </>}
      </>)
}
