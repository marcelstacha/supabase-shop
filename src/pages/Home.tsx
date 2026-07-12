import { AnimatePresence, motion } from "motion/react"
import PageHeading from "../components/PageHeading";
import ShuffledGrid from "../components/ShuffledGrid";
import BestPhones from "../components/BestPhones";
import { useProducts } from "../context/ProductsContext";
import { NavLink } from "react-router-dom";
import Splash from "../components/Splash";

export default function Home() {

   const { phones } = useProducts()

   return (<>
      <PageHeading>Willkommen</PageHeading>
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center p-2 lg:p-10 text-sm lg:text-lg text-nowrap bg-white border border-gray-900 rounded-xl"
         >
            <NavLink to="/phonegrid">
               <Splash />
            </NavLink>
            <ShuffledGrid />
            <div className="flex md:flex-row flex-col justify-center gap-0 md:gap-16">
               <NavLink to="/phonegrid">
                  <button className="md:my-7 md:mt-8 lg:mt-14 lg:mb-4 md:px-12 xl:px-12 xl:py-7 w-full md:w-auto h-16 xl:h-auto text-sm md:text-base xl:text-xl bg-accent lg:hover:bg-gray-100 big-button">
                     Alle Produkte anzeigen
                  </button>
               </NavLink>
               <NavLink to="/phonelist">
                  <button className="md:my-7 md:mt-8 lg:mt-14 lg:mb-4 md:px-12 xl:px-12 xl:py-7 w-full md:w-auto h-16 xl:h-auto text-sm md:text-base xl:text-xl bg-accent lg:hover:bg-gray-100 big-button">
                     Produktliste anzeigen
                  </button>
               </NavLink>
            </div>
            <BestPhones
               phones={phones}
            />
         </motion.div>
      </AnimatePresence>
   </>)
}