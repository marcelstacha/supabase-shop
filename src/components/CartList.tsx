import { AnimatePresence, motion } from "motion/react"
import CartRow from "./CartRow";
import CartProps from "../interfaces/CartProps";

export default function CartList({ filtered, optimisticUpdate }: { filtered: CartProps[], optimisticUpdate: (id: number) => void }) {

   return (<>
      <AnimatePresence>
         <div className="m-auto w-[95%] xl:w-[1175px]">
            <table className="mt-1 w-full text-xs sm:text-sm md:text-lg bg-white">
               <thead className="text-xs sm:text-sm">
                  <tr>
                     <th>Bild</th>
                     <th>Name</th>
                     <th>Preis</th>
                     <th></th>
                  </tr>
               </thead>

               <motion.tbody
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
               >
                  {filtered.slice().sort((a, b) => a.brand == b.brand ? a.name.localeCompare(b.name) : a.brand.localeCompare(b.brand)).map((item: CartProps) => (
                     <CartRow
                        key={item.prod_id != undefined ? item.prod_id : item.id}
                        item={item}
                        update={optimisticUpdate}
                     />
                  ))}
               </motion.tbody>
            </table>
         </div>
      </AnimatePresence>
   </>)
}