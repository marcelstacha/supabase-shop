import { Outlet } from "react-router-dom"
import TopBanner from "../components/layout/TopBanner"
import Footer from "../components/layout/Footer"

export default function Layout() {

   return (<>
      <div className="flex flex-col px-2 md:px-4">
         <TopBanner />
         <main className="flex-grow">
            <Outlet />
         </main>
         <Footer />
      </div>
   </>)
}