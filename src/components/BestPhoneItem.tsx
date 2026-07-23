
import PhoneProps from "../interfaces/PhoneProps"
import { NavLink } from "react-router-dom"

interface BestPhoneItemProps {
   item: PhoneProps | null | undefined
   category: "battery" | "biggest" | "smallest" | "lightest" | "fastest" | "thinnest"
}

export default function BestPhoneItem({ category, item }: BestPhoneItemProps) {

   if (!item) {
      return
   }

   let text
   let val
   let unit

   switch (category) {
      case "battery":
         text = ["Höchste", "Akkukapazität"]
         val = item.battery
         unit = "mAh"
         break;

      case "lightest":
         text = ["Geringstes", "Gewicht"]
         val = item.weight
         unit = "g"
         break;

      case "biggest":
         text = ["Größtes", "Display"]
         val = item.screen
         unit = "\""
         break;

      case "smallest":
         text = ["Kleinstes", "Display"]
         val = item.screen
         unit = "\""
         break;

      case "thinnest":
         text = ["Dünnstes", "Gehäuse"]
         val = item.dimensions.depth
         unit = "mm"
         break;

      case "fastest":
         text = ["Schnellstes", "Aufladen"]
         val = item.charging
         unit = "W"
         break;
   }

   return <>
      <NavLink to={`/phonedetail/${item.id}`}>
         <div className="group relative py-2 sm:py-4 lg:py-5 xl:py-6 overflow-hidden md:hover:bg-accent/5 border border-gray-900 rounded-lg transition cursor-pointer">
            <div className="flex lg:flex-row flex-col justify-center items-center m-auto lg:mb-6 p-6 py-1 lg:w-[19.5rem] xl:w-[23rem] sm:size-fit lg:text-white lg:bg-black rounded-full">
               <div className="flex lg:flex-row flex-col items-center lg:gap-1 text-center gap">
                  <span className="p-0 w-auto font-bold text-xs sm:text-sm lg:text-base xl:text-lg leading-1">
                     {text[0]}
                  </span>
                  <span className="p-0 lg:p-0 w-auto font-bold text-xs sm:text-sm lg:text-base xl:text-lg leading-none">
                     {text[1]}
                  </span>
                  <span className="hidden lg:block p-0 w-auto font-bold text-sm sm:text-sm lg:text-base xl:text-lg leading-none">
                     :
                  </span>
               </div>
               <span className="flex flex-row lg:m-0 my-1 lg:mt-[1px] px-3 sm:px-4 py-0 sm:py-0 lg:pl-2 font-normal text-accent text-md sm:text-base lg:text-lg xl:text-xl bg-black lg:bg-transparent rounded-full price">
                  {val}
                  <div className="pl-[0.125rem] tracking-wider">{unit}</div>
               </span>
            </div>
            <img src={`${item.img}-1.jpg`}
               className="hidden sm:block m-auto my-4 xl:my-5 max-h-20 lg:max-h-40 xl:max-h-52 object-contain"
            />
            <hr className="sm:hidden block m-1 mb-2 h-[2px] bg-gray-900" />
            <span className="flex flex-col justify-center p-0">
               <h1 className="font-bold text-sm sm:text-base md:text-lg xl:text-xl transition-all">{item.brand}</h1>
               <h1 className="font-medium md:text-md text-sm sm:text-base xl:text-lg transition-all">{item.name}</h1>
            </span>
            <div className="bottom-0 left-0 absolute w-full h-[3px] bg-accent"></div>
         </div>
      </NavLink>
   </>
}