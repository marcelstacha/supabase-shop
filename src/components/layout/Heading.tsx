import { ReactNode } from "react"

export default function Heading({ children }: { children: ReactNode }) {

   return (<>
      <h1 className="lg:my-4 2xl:my-7 xl:my-6 mb-2 lg:mb-3 font-semibold lg:text-[2.2rem] xl:text-[2.5rem] text-xl sm:text-2xl md:text-3xl transition-all">
         {children}
      </h1>
   </>)
}