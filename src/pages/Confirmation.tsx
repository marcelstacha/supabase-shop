import { CheckBadgeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import Heading from "../components/layout/Heading";

export default function Confirmation() {
   return (
      <>
         <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
               <div className="mt-16 md:mt-36">
                  <Heading>Vielen Dank für Ihren Einkauf!</Heading>
               </div>
               <CheckBadgeIcon className="stroke-green-500 m-auto my-8 md:my-16 w-24" />
               <NavLink to="/user">
                  <button className="flex flex-row justify-center items-center gap-2 bg-transparent hover:bg-white m-auto px-4 py-4 border border-gray-900 rounded-lg sm:w-64 text-lg">
                     <span>Bestellungen</span>
                     <span>
                        <UserCircleIcon className="stroke-primary w-7 h-7" />
                     </span>
                  </button>
               </NavLink>
            </motion.div>
         </AnimatePresence>
      </>
   );
}
