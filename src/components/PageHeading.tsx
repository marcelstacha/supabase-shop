import { ReactNode } from "react"

export default function PageHeading({ children }: { children: ReactNode }) {

   return (<>
      <h1 className="my-3 sm:my-8 mb-4 font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-all">
         {children}
      </h1>
   </>)
}