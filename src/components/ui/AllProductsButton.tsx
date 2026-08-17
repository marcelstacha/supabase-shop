import { NavLink } from "react-router-dom";

export default function AllProductsButton() {

   return (<>
      <div className="flex md:flex-row flex-col justify-center gap-0 md:gap-16">
         <NavLink to="/phonegrid">
            <button className="md:my-6 lg:my-4 md:mt-4 md:px-12 xl:px-12 xl:py-7 w-full md:w-auto h-16 xl:h-auto text-sm md:text-base xl:text-xl bg-accent lg:hover:bg-gray-100 big-button">
               Alle Produkte anzeigen
            </button>
         </NavLink>
      </div>
   </>)
}