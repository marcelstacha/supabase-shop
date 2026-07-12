import { ChangeEvent, useEffect, useState } from "react"
import { useProducts } from "../context/ProductsContext"
import useDebounce from "../hooks/useDebounce"
import PhoneProps from "../interfaces/PhoneProps"
import { NavLink } from "react-router-dom"
import { motion } from "motion/react"
import { XCircleIcon } from "@heroicons/react/24/outline"

export default function SearchBar() {

   const [animateHide, setAnimateHide] = useState(false)
   const [query, setQuery] = useState("")
   const [results, setResults] = useState<PhoneProps[]>([])
   const [canOpen, setCanOpen] = useState(false)

   const { phones } = useProducts()
   const debouncedQuery = useDebounce(query)
   const isSearching = debouncedQuery.length >= 2
   const filterAttributes = ["name", "brand"]

   useEffect(() => {
      if (isSearching) {
         setResults(phones.filter((item) =>
            filterAttributes.some((attribute) =>
               (item[attribute as keyof PhoneProps] as string).toLowerCase().includes(debouncedQuery)
            )
         ))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedQuery])

   function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
      const value = e.target.value
      setQuery(value.toLowerCase())
   }

   function handleOpen() {
      setAnimateHide(false)
      setCanOpen(true)
   }

   function handleClose() {
      setAnimateHide(true)
      setTimeout(() => {
         setCanOpen(false)
      }, 200)
   }

   return (<>
      <div className="hidden sm:block relative content-center m-auto mx-6 md:mx-6 w-full">
         <div className="">
            <input
               name="search"
               placeholder="Suche"
               value={query}
               onChange={(e) => onChangeHandler(e)}
               className="hidden z-50 relative sm:flex w-full sm:margin-auto"
               onFocus={handleOpen}
               onBlur={handleClose}
            >
            </input>
            {debouncedQuery.length > 0 &&
               <XCircleIcon
                  className="top-1 right-1 z-50 absolute w-7 h-7 text-gray-900 hover:text-red-600 transition-all cursor-pointer"
                  onClick={() => setQuery("")}
               />
            }
         </div>

         {isSearching && canOpen && <>
            <div className="top-0 left-0 fixed w-screen h-screen bg-[rgba(255,255,255,0.9)]"></div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: animateHide ? 0 : 1 }}
               transition={{ duration: 0.15 }}
               className="top-8 left-[50%] absolute flex flex-col p-1 md:p-4 lg:p-8 w-full bg-[rgb(255,255,255)] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-b-lg transition-all -translate-x-1/2"
            >
               {results.length > 0 ?
                  <>
                     <ul className="z-[80] border-t-2">
                        {results && results.map((result: PhoneProps) =>
                           <NavLink
                              key={result.id}
                              to={`/phonedetail/${result.id}`}
                           >
                              <li className="py-1 border-b-2"
                                 key={result.id}
                              >
                                 <span className="flex items-center m-auto text-base">
                                    <img className="hidden lg:block md:mr-3 md:size-16 object-contain" src={`${result.img}-1.jpg`} />
                                    <span className="font-bold text-xs md:text-sm lg:text-base">{result.brand}</span>
                                    <span className="font-medium text-xs md:text-sm lg:text-base">{result.name}</span>
                                 </span>
                              </li>
                           </NavLink>
                        )}
                     </ul>
                  </>
                  : <span>Keine Suchergebnisse</span>}
            </motion.div></>
         }
      </div>
   </>)
}