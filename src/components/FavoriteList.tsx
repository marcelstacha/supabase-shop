import { AnimatePresence, motion } from "motion/react"
import FavoriteRow from "./FavoriteRow";
import FavoriteProps from "../interfaces/FavoriteProps";

export default function FavoriteList({ filtered, optimisticUpdate }: { filtered: FavoriteProps[], optimisticUpdate: (id: number) => void }) {

   return (<>
      <AnimatePresence>
         <div>
            <table className="mt-1 mb-2 lg:w-auto text-xs sm:text-sm md:text-lg bg-white">
               <thead className="text-xs sm:text-sm">
                  <tr>
                     <th>Bild</th>
                     <th className="sm:w-40">Name</th>
                     <th className="hidden lg:table-cell px-2">Bildschirm</th>
                     <th className="hidden xl:table-cell">SOC</th>
                     <th className="hidden lg:table-cell w-28">Akku</th>
                     <th className="hidden xl:table-cell">Laden</th>
                     <th className="hidden xl:table-cell">Kabellos</th>
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
                  {filtered.map((item: FavoriteProps) => (
                     <FavoriteRow
                        key={item.prod_id}
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