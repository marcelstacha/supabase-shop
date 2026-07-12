import { motion } from "motion/react"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import PhoneProps from "../interfaces/PhoneProps";

import placeholder from "/placeholder.svg";

export default function ShuffledGrid() {

   const [shuffled, setShuffled] = useState<PhoneProps[]>([])

   const { phones } = useProducts()

   const phoneCountStartpage = 16

   const indices = Array.from({ length: phones.length }, (_, i) => i);
   const placeholderIndices = Array.from({ length: phoneCountStartpage }, (_, i) => i);

   useEffect(() => {
      const arr: PhoneProps[] = []

      if (phones && phones.length > 0) {
         for (let i = 0; i < phoneCountStartpage; i++) {
            const index = Math.floor(Math.random() * indices.length)
            arr.push(phones[indices[index]])
            indices.splice(index, 1)
         }
      }
      setShuffled(arr)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [phones])

   return (<>
      <NavLink
         to={"/phonegrid"}
      >
         <div className="z-50 relative justify-items-center gap-1 grid grid-cols-4 sm:grid-cols-8 2xl:grid-cols-8">
            {shuffled.length == 0 ?
               placeholderIndices.map((index) =>
                  <motion.div
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1 }}
                  >
                     <img
                        className="sm:m-3 max-w-fit h-14 sm:h-16 md:h-20 lg:h-20 xl:h-28 object-contain"
                        src={placeholder}
                     />
                  </motion.div>
               ) :
               shuffled.map((phone) => (
                  <motion.div
                     key={phone.id}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.75 }}
                  >
                     <img
                        className="sm:m-3 max-w-fit h-14 sm:h-16 md:h-20 lg:h-20 xl:h-28 object-contain"
                        src={`${phone.img}-${Math.round(Math.random() + 1)}.jpg`}>
                     </img>
                  </motion.div>
               ))}
         </div>
      </NavLink>
   </>)
}