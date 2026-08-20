import { ReactNode } from "react"

export default function Heading({ children }: { children: ReactNode }) {

   return (<>
      <h1 className="md:my-1 lg:my-4 2xl:my-7 xl:my-6 lg:mb-1 font-semibold lg:text-[2.2rem] xl:text-[2.5rem] text-xl sm:text-2xl md:text-3xl transition-all">
         {children}
      </h1>
   </>)
}