import { ReactNode, MouseEventHandler } from 'react';

interface FilterButtonProps {
   children: ReactNode,
   isMobile?: boolean,
   value: string,
   filterBy: string,
   filterHandler: MouseEventHandler<HTMLButtonElement>
}

export default function FilterButton({ children, isMobile = false, value, filterBy, filterHandler }: FilterButtonProps) {

   function getStyle() {
      const isActive = filterBy === value;
      const mobileStyle = "md:hidden block m-auto";
      const desktopStyle = "hidden md:block m-0 ";
      const baseStyle = "border border-gray-900 text-gray-900 text-xs sm:text-base p-2 min-[400px]:px-4 transition";

      if (isMobile) {
         return `${baseStyle} ${mobileStyle} ${isActive ? "bg-accent" : "bg-white"}`;
      } else {
         return `${baseStyle} ${desktopStyle} ${isActive ? "bg-accent hover:bg-gray-700 hover:text-white" : "bg-white hover:bg-gray-200"}`;
      }
   }

   const style = getStyle()

   return (<>
      <button
         title={`filter-${value}`}
         className={style}
         onClick={(e) => filterHandler(e)}
         value={value}>

         {children}

      </button>
   </>)
}
