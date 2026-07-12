import { ReactNode, MouseEventHandler } from 'react';

interface FilterButtonProps {
   isMobile?: boolean,
   children: ReactNode,
   value: string,
   filterBy: string,
   filterHandler: MouseEventHandler<HTMLButtonElement>
}

export default function FilterButton({ children, isMobile = false, value, filterBy, filterHandler }: FilterButtonProps) {

   function getStyle() {
      let base = ""
      let style = ""

      if (isMobile) {
         base = "md:hidden block p-2 m-auto border border-gray-900 text-gray-900 text-xs sm:text-base"
         if (filterBy == value) {
            style = base + " " + "bg-accent"
         } else {
            style = base + " " + "bg-white"
         }
      } else {
         base = "hidden md:block border border-gray-900 text-gray-900 text-xs sm:text-base p-2 m-0 md:px-4 transition"
         if (filterBy == value) {
            style = base + " " + "bg-accent hover:bg-gray-700 hover:text-white"
         } else {
            style = base + " " + "bg-white hover:bg-gray-200"
         }
      }

      return style
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
