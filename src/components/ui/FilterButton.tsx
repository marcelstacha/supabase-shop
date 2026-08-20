import { ReactNode, MouseEventHandler } from 'react';

interface FilterButtonProps {
   children: ReactNode,
   value: string,
   filterBy: string,
   filterHandler: MouseEventHandler<HTMLButtonElement>
}

export default function FilterButton({ children, value, filterBy, filterHandler }: FilterButtonProps) {

   function getStyle() {
      const isActive = filterBy === value;
      const baseStyle = `border border-gray-900 px-[0.45rem] 2xl:py-3
       ${isActive ? "bg-accent md:hover:bg-gray-700 md:hover:text-white" : "md:hover:bg-gray-200 bg-white"} 
       text-gray-900 text-xs sm:text-base min-[400px]:px-4`

      return baseStyle
   }

   const style = getStyle()

   return (<>
      <button
         title={`filter-${value}`}
         className={style}
         onClick={(e) => filterHandler(e)}
         value={value}
      >
         {children}
      </button>
   </>)
}
