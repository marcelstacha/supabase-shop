import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

export default function Header() {

   return (<>
      <nav className="z-[70] relative flex flex-row justify-between px-2 w-full h-10">

         <NavLink to="/" className="z-[100] flex flex-row md:mr-7 w-80">
            <div className="flex flex-row">
               <img src="/logo.svg" className="mr-1 min-[400px]:mr-2 w-4 min-[400px]:w-5 md:w-7 lg:w-8 2xl:w-10 xl:w-9" />
               <span className="flex items-center p-0 h-10 font-semibold min-[360px]:text-[0.85rem] min-[400px]:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] text-xs 2xl:text-2xl gradient">
                  SupabaseShop
               </span>
            </div>
         </NavLink>

         <SearchBar />

         <NavBar />

      </nav>
   </>)
}