import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import PhoneProps from "../../interfaces/PhoneProps";

interface BestPhoneItemProps {
   item: PhoneProps[] | null | undefined;
   category: "battery" | "biggest" | "smallest" | "lightest" | "fastest" | "thinnest";
}

export default function BestPhoneItem({ category, item }: BestPhoneItemProps) {
   const count = item?.length ?? 0;

   const bestPhoneId = useMemo(() => {
      return Math.floor(Math.random() * count);
   }, [count]);

   if (!item || count === 0) {
      return null;
   }

   let text: string[];
   let val: number;
   let unit: string;

   switch (category) {
      case "battery":
         text = ["Höchste", "Akkukapazität"];
         val = item[bestPhoneId].battery;
         unit = "mAh";
         break;

      case "lightest":
         text = ["Geringstes", "Gewicht"];
         val = item[bestPhoneId].weight;
         unit = "g";
         break;

      case "biggest":
         text = ["Größtes", "Display"];
         val = item[bestPhoneId].screen;
         unit = '"';
         break;

      case "smallest":
         text = ["Kleinstes", "Display"];
         val = item[bestPhoneId].screen;
         unit = '"';
         break;

      case "thinnest":
         text = ["Dünnstes", "Gehäuse"];
         val = item[bestPhoneId].dimensions.depth;
         unit = "mm";
         break;

      case "fastest":
         text = ["Schnellstes", "Aufladen"];
         val = item[bestPhoneId].charging;
         unit = "W";
         break;
   }

   return (
      <>
         <NavLink to={`/phonedetail/${item[bestPhoneId].id}`}>
            <button className="group relative md:hover:bg-accent/5 py-2 sm:py-4 lg:py-5 xl:py-6 sm:pt-3 border border-gray-900 rounded-lg w-full overflow-hidden transition duration-100 cursor-pointer">
               <div className="flex lg:flex-row flex-col justify-center items-center lg:bg-gray-900 m-auto lg:mb-6 p-6 py-1 rounded-full lg:w-[19.5rem] sm:size-fit lg:text-white">
                  <div className="flex lg:flex-row flex-col items-center lg:gap-1 lg:mr-[3px] text-center">
                     <span className="p-0 w-auto font-bold text-xs sm:text-sm lg:text-base leading-1">{text[0]}</span>
                     <span className="p-0 lg:p-0 w-auto font-bold text-xs sm:text-sm lg:text-base leading-none">{text[1]}</span>
                     <span className="hidden lg:block p-0 w-auto font-bold text-sm sm:text-sm lg:text-base leading-none">:</span>
                  </div>
                  <span className="flex flex-row bg-gray-900 lg:bg-transparent lg:m-0 my-1 lg:mt-[1px] lg:ml-[3px] px-3 md:px-4 lg:px-0 py-0 lg:pb-[2px] rounded-full font-normal text-accent text-md sm:text-base lg:text-lg price">
                     {val}
                     <div className="pl-[0.125rem] tracking-wider">{unit}</div>
                  </span>
               </div>
               <img
                  alt={`${item[bestPhoneId].brand} ${item[bestPhoneId].name}`}
                  src={`${item[bestPhoneId].img}-1.jpg`}
                  className="hidden sm:block m-auto my-4 xl:my-5 max-h-20 lg:max-h-40 xl:max-h-52 object-contain"
               />
               <hr className="sm:hidden block bg-gray-900 m-1 mb-2 h-[2px]" />
               <span className="flex flex-col justify-center p-0">
                  <h1 className="font-bold text-sm min-[500px]:text-base md:text-lg lg:text-xl truncate transition-all">
                     {item[bestPhoneId].brand}
                  </h1>
                  <h1 className="px-1 font-medium text-[0.75rem] md:text-md min-[500px]:text-base lg:text-lg truncate transition-all">
                     {item[bestPhoneId].name}
                  </h1>
               </span>
               <div className="bottom-0 left-0 absolute bg-accent w-full h-[3px]"></div>
            </button>
         </NavLink>
      </>
   );
}
