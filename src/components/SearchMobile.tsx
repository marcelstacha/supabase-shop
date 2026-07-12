import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useProducts } from "../context/ProductsContext";
import useDebounce from "../hooks/useDebounce";
import PhoneProps from "../interfaces/PhoneProps";
import { motion } from "motion/react"
import { NavLink, useLocation } from "react-router-dom";

export default function SearchMobile() {

   const [query, setQuery] = useState("")
   const [results, setResults] = useState<PhoneProps[]>([])
   const [canOpen, setCanOpen] = useState(false)
   const [animateHide, setAnimateHide] = useState(false)

   const { phones } = useProducts()
   const debouncedQuery = useDebounce(query)
   const location = useLocation()
   const isSearching = debouncedQuery.length >= 2
   const filterAttributes = ["name", "brand"]

   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (isSearching) {
         setResults(
            phones.filter((item) =>
               filterAttributes.some((attribute) =>
                  (item[attribute as keyof PhoneProps] as string).toLowerCase().includes(debouncedQuery)
               )
            )
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedQuery])

   useEffect(() => {
      handleClose()
   }, [location])

   function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
      if (!ref.current || (e.relatedTarget && ref.current.contains(e.relatedTarget))) {
         handleClose();
      }
   }

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

   function touchSearchItemHandler() {
      setQuery("")
      handleClose()
   }

   function handleDeleteIcon(e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) {
      e.stopPropagation()
      setQuery("")
   }

   return (<>
      <div ref={ref}
         onBlur={handleBlur}
      >
         <span
            className="group sm:hidden flex items-center px-0 sm:px-2 cursor-pointer"
            onTouchEnd={handleOpen}
         >
            <MagnifyingGlassIcon
               className="w-5 sm:w-6 h-5 sm:h-6 text-gray-900 group-hover:text-yellow-600"
            />
         </span>

         <div
            className="top-11 left-0 -z-10 absolute mx-[2.5%] w-[95%]"
         >
            {canOpen &&
               <>
                  <div
                     onTouchStart={handleClose}
                     className="sm:hidden top-0 left-0 z-20 fixed inset-0 w-full h-full bg-white"
                  />

                  <div
                     onTouchStart={handleClose}
                     className="sm:hidden top-0 left-0 z-20 fixed inset-0 w-screen h-44"
                  />
                  <motion.input
                     autoComplete="off"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: animateHide ? 0 : 1 }}
                     transition={{ duration: 0.15 }}
                     className="sm:hidden left-1/2 z-[60] absolute px-4 w-full border border-gray-900 -translate-x-1/2 transform"
                     name="search"
                     placeholder="Suche"
                     value={query}
                     onChange={(e) => onChangeHandler(e)}
                     onFocus={handleOpen}
                  >
                  </motion.input>
                  {query.length > 0 &&
                     <XCircleIcon
                        className="sm:hidden block top-1 right-[8px] z-[70] absolute w-7 h-7 text-gray-900 hover:text-red-600 transition-all cursor-pointer"
                        onTouchStart={e => handleDeleteIcon(e)}
                     />
                  }
               </>
            }
            {isSearching && canOpen &&
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animateHide ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className="sm:hidden top-6 left-1/2 z-50 absolute flex flex-col py-6 w-full h-min overflow-y-auto bg-white rounded-b-lg -translate-x-1/2"
               >
                  {results.length > 0 ? (
                     <ul>
                        {results.map((result: PhoneProps) => (
                           <NavLink key={result.id} to={`/phonedetail/${result.id}`}>
                              <li
                                 className="border-b-2"
                                 onClick={touchSearchItemHandler}
                              >
                                 <span className="flex items-center m-auto p-0 py-1 w-64 text-sm">
                                    <img className="mr-2 size-9 object-contain" src={`${result.img}-1.jpg`} />
                                    <span className="font-bold">{result.brand}</span>
                                    <span className="font-medium">{result.name}</span>
                                 </span>
                              </li>
                           </NavLink>
                        ))}
                     </ul>
                  ) : (
                     <span>Keine Suchergebnisse</span>
                  )}
               </motion.div>
            }
         </div>
      </div>
   </>)
}