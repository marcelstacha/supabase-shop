import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

export default function TopBanner() {

   return (<>
      <nav className="z-[70] relative flex flex-row justify-between items-center px-2 md:px-3 lg:px-0 py-6 sm:py-7 lg:py-0 w-full h-10 bg-white lg:bg-transparent border border-black lg:border-none rounded-lg">

         <div className="flex-none pr-2">
            <NavLink to="/" className="z-[100] flex flex-row">
               <div className="flex flex-row">
                  <img src="/logo.svg" className="mr-1 min-[400px]:mr-2 pl-1 w-5 sm:w-7 min-[400px]:w-6 md:w-8 lg:w-8 2xl:w-10 xl:w-9" />
                  <span className="flex items-center p-0 h-10 font-semibold min-[360px]:text-[0.85rem] min-[400px]:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-xs 2xl:text-2xl gradient">
                     SupabaseShop
                  </span>
               </div>
            </NavLink>
         </div>

         <div className="hidden lg:block flex-1 px-5">
            <SearchBar />
         </div>

         <div className="flex-none pr-1 sm:pr-0">
            <NavBar />
         </div>

      </nav>
   </>)
}