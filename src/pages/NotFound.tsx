import Heading from "../components/layout/Heading";
import RedirectButton from "../components/ui/RedirectButton";

// pages/NotFound.tsx
export default function NotFound() {
   return (
      <>
         <Heading>Seite nicht gefunden</Heading>
         <div className="flex flex-col items-center bg-white py-8 border border-gray-900 rounded-lg">
            <RedirectButton clickPath={"/phonegrid"} text={["Diese Seite existiert nicht.", "Zur Startseite"]} />
         </div>
      </>
   );
}
