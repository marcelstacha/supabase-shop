import { ReactNode } from "react"

export default function Heading({ children }: { children: ReactNode }) {

   return (<>
      <h1 className="my-2 lg:my-3 2xl:my-7 xl:my-6 font-semibold lg:text-[2.2rem] xl:text-[2.5rem] text-xl sm:text-2xl md:text-3xl transition-all">
         {children}
      </h1>
   </>)
}