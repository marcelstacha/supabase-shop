import { AnimatePresence, motion } from "motion/react"
import PageHeading from "../components/PageHeading";
import { CheckBadgeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Confirmation() {

   return (<>
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
         >
            <div className="mt-16 md:mt-36">
               <PageHeading>Vielen Dank für Ihren Einkauf!</PageHeading>
            </div>
            <CheckBadgeIcon
               className="m-auto my-8 md:my-16 w-24 stroke-green-500"
            />
            <NavLink to="/user">
               <div
                  className="flex flex-row justify-center items-center gap-2 m-auto px-4 py-4 sm:w-64 text-lg bg-transparent hover:bg-white border border-gray-900 rounded-lg"
               >
                  <span>Bestellungen</span>
                  <span>
                     <UserCircleIcon className="w-7 h-7 stroke-primary" />
                  </span>
               </div>
            </NavLink>
         </motion.div>
      </AnimatePresence>
   </>)
}