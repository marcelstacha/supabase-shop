import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

export default function Header() {

   return (<>
      <nav className="z-[70] relative flex flex-row justify-between px-2 w-full h-10">

         <NavLink to="/" className="z-[100] flex flex-row md:mr-7 w-80">
            <div className="flex flex-row">
               <img src="logo.svg" className="mr-2 w-5 md:w-7" />
               <span className="flex items-center p-0 h-10 font-semibold md:text-[0.9rem] text-xs sm:text-sm md:text-lg lg:text-xl gradient">
                  SupabaseShop
               </span>
            </div>
         </NavLink>

         <SearchBar />

         <NavBar />

      </nav>
   </>)
}