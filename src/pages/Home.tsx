import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Heading from "../components/layout/Heading";
import BestPhones from "../components/home/BestPhones";
import Splash from "../components/home/Splash";
import { useProductsStore } from "../store/useProductsStore";
import { AnimatePresence, motion } from "motion/react"
import AllProductsButton from "../components/ui/AllProductsButton";
import ShuffledGrid from "../components/home/ShuffledGrid";

export default function Home() {

   const phones = useProductsStore((state) => state.phones)
   const fetchProducts = useProductsStore((state) => state.fetchProducts);

   useEffect(() => {
      fetchProducts()
   }, [fetchProducts])

   return (<>
      <Heading>Willkommen!</Heading>
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
            <AllProductsButton />
            <BestPhones phones={phones} />

         </motion.div>
      </AnimatePresence>
   </>)
}