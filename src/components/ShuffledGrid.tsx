import { motion } from "motion/react"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PhoneProps from "../interfaces/PhoneProps";

import placeholder from "/placeholder.svg";
import { useProductsStore } from "../store/useProductsStore";

export default function ShuffledGrid() {

   const [shuffled, setShuffled] = useState<(PhoneProps & { isFront: boolean })[]>([])

   const phones = useProductsStore((state) => state.phones)

   const phoneCountStartpage = 16

   const indices = Array.from({ length: phones.length }, (_, i) => i);
   const placeholderIndices = Array.from({ length: phoneCountStartpage }, (_, i) => i);

   useEffect(() => {
      const arr: (PhoneProps & {
         isFront: boolean
      })[] = []

      if (phones && phones.length > 0) {
         for (let i = 0; i < phoneCountStartpage; i++) {
            const index = Math.floor(Math.random() * indices.length)
            arr.push({
               ...phones[indices[index]],
               isFront: Math.random() > 0.5
            })
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
                     transition={{ duration: 0.5 }}
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
                     transition={{ duration: 0.5 }}
                  >
                     <img
                        className="sm:m-3 max-w-fit h-14 sm:h-16 md:h-20 lg:h-20 xl:h-28 object-contain"
                        src={`${phone.img}-${phone.isFront ? 2 : 1}.jpg`}>
                     </img>
                  </motion.div>
               ))}
         </div>
      </NavLink >
   </>)
}