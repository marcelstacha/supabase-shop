import { useEffect } from "react";
import PageHeading from "../components/PageHeading";
import OrderList from "../components/OrderList";
import { useOrders } from "../context/OrdersContext";
import { useAuth } from "../context/AuthContext";

export default function User() {

   const { orders, fetchOrders } = useOrders()
   const { login, logout, error, user } = useAuth()

   useEffect(() => {
      fetchOrders()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   let orderNumberText = ""

   switch (orders.length) {
      case 0:
         orderNumberText = "Keine Bestellungen"
         break;
      case 1:
         orderNumberText = "1 Bestellung"
         break;
      default:
         orderNumberText = orders.length.toString() + " Bestellungen"
         break;
   }

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (<>
      <PageHeading>Profil</PageHeading>
      <div className="flex flex-col justify-center m-auto p-6 sm:p-8 lg:p-10 max-w-[46rem] text-sm sm:text-base lg:text-lg text-nowrap bg-white border border-gray-900 rounded-lg">
         {!user && error && <div>Fehler</div>}
         {user ?
            <>
               <div>
                  Nutzer
               </div>
               <div>
                  {user.email}
               </div>
               <div className="font-semibold text-[#277e17]">
                  Angemeldet
               </div>
               <hr className="my-4" />
               <div>
                  Nutzer ID:
               </div>
               <div className="text-[0.6rem] sm:text-[0.84rem] selectable">
                  {user.id}
               </div>
               <button
                  className="hover:text-white text-sm sm:text-base hover:bg-red-600 border border-gray-900 big-button"
                  onClick={logout}
               >
                  Ausloggen
               </button>
               <hr className="mt-8 mb-6" />
               <h2 className="mb-3">{orderNumberText}</h2>
               <OrderList />
               <button
                  className="xl:hidden block text-sm sm:text-base hover:bg-[rgb(57,255,20)] border border-gray-900 big-button"
                  onClick={scrollToTop}
               >
                  Nach oben
               </button>
            </>
            : (
               <div className="flex flex-col justify-center">
                  {error && error.toString().length > 0 &&
                     <div className="flex justify-center mb-8 font-semibold text-red-500">
                        Falsche Login-Daten
                     </div>
                  }
                  <form
                     className="flex flex-col gap-4 m-auto hover:bg-opacity-50"
                     onSubmit={login}
                  >
                     <input
                        name="email"
                        type="email"
                        placeholder="E-Mail"
                     />
                     <input
                        className=""
                        name="password"
                        type="password"
                        placeholder="Passwort"
                     />
                     <button
                        className="hover:bg-[rgb(57,255,20)] border border-gray-900 big-button"
                        type="submit"
                     >
                        Login
                     </button>
                  </form>
               </div>
            )
         }
      </div>
   </>)
}