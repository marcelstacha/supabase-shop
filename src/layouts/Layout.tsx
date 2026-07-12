import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Layout() {

   return (<>
      <div className="flex flex-col px-2 md:px-4">
         <Header />
         <main className="flex-grow">
            <Outlet />
         </main>
         <Footer />
      </div>
   </>)
}