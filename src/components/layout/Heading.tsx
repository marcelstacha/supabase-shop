import { ReactNode } from "react"
import { useLocation } from "react-router-dom"

export default function Heading({ children }: { children: ReactNode }) {

   const location = useLocation()

   const isGrid = location.pathname == "/phonegrid" ? true : false

   return (<>
      <h1 className={`font-semibold lg:text-[2.2rem] xl:text-[2.5rem] text-xl sm:text-2xl md:text-3xl 2xl:text-6xl transition-all 
      ${isGrid ? "my-2 sm:my-3 md:my-4 lg:my-5 2xl:mt-7 2xl:-mb-9 xl:-mb-10"
            : "my-2 lg:my-3 2xl:my-7 xl:my-6"}
         `}>
         {children}
      </h1>
   </>)
}