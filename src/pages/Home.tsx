import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import ShuffledGrid from "../components/ShuffledGrid";
import BestPhones from "../components/BestPhones";
import Splash from "../components/Splash";
import { useProductsStore } from "../store/useProductsStore";
import { AnimatePresence, motion } from "motion/react"
import AllProductsButton from "../components/AllProductsButton";

export default function Home() {

   const phones = useProductsStore((state) => state.phones)
   const fetchProducts = useProductsStore((state) => state.fetchProducts);

   useEffect(() => {

      fetchProducts()

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (<>
      <PageHeading>Willkommen!</PageHeading>
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