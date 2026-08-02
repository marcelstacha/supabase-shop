import { ReactNode } from "react"

export default function PageHeading({ children }: { children: ReactNode }) {

   return (<>
      <h1 className="my-1 sm:my-5 lg:my-6 2xl:my-7 sm:mb-4 font-semibold 2xl:text-[2.5rem] text-2xl sm:text-3xl md:text-4xl transition-all">
         {children}
      </h1>
   </>)
}