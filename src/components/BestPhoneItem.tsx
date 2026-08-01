
import PhoneProps from "../interfaces/PhoneProps"
import { NavLink } from "react-router-dom"

interface BestPhoneItemProps {
   item: PhoneProps[] | null | undefined
   category: "battery" | "biggest" | "smallest" | "lightest" | "fastest" | "thinnest"
}

export default function BestPhoneItem({ category, item }: BestPhoneItemProps) {

   if (!item) {
      return null
   }

   let text: string[]
   let val: number
   let unit: string

   const bestPhoneId = Math.floor(Math.random() * item.length)
   console.log(bestPhoneId)

   switch (category) {
      case "battery":
         text = ["Höchste", "Akkukapazität"]
         val = item[bestPhoneId].battery
         unit = "mAh"
         break;

      case "lightest":
         text = ["Geringstes", "Gewicht"]
         val = item[bestPhoneId].weight
         unit = "g"
         break;

      case "biggest":
         text = ["Größtes", "Display"]
         val = item[bestPhoneId].screen
         unit = "\""
         break;

      case "smallest":
         text = ["Kleinstes", "Display"]
         val = item[bestPhoneId].screen
         unit = "\""
         break;

      case "thinnest":
         text = ["Dünnstes", "Gehäuse"]
         val = item[bestPhoneId].dimensions.depth
         unit = "mm"
         break;

      case "fastest":
         text = ["Schnellstes", "Aufladen"]
         val = item[bestPhoneId].charging
         unit = "W"
         break;
   }

   return <>
      <NavLink to={`/phonedetail/${item[bestPhoneId].id}`}>
         <div className="group relative py-2 sm:py-4 lg:py-5 xl:py-6 sm:pt-3 overflow-hidden md:hover:bg-accent/5 border border-gray-900 rounded-lg transition cursor-pointer">
            <div className="flex lg:flex-row flex-col justify-center items-center m-auto lg:mb-6 p-6 py-1 lg:w-[19.5rem] sm:size-fit lg:text-white lg:bg-black rounded-full">
               <div className="flex lg:flex-row flex-col items-center lg:gap-1 lg:mr-[3px] text-center gap">
                  <span className="p-0 w-auto font-bold text-xs sm:text-sm lg:text-base leading-1">
                     {text[0]}
                  </span>
                  <span className="p-0 lg:p-0 w-auto font-bold text-xs sm:text-sm lg:text-base leading-none">
                     {text[1]}
                  </span>
                  <span className="hidden lg:block p-0 w-auto font-bold text-sm sm:text-sm lg:text-base leading-none">
                     :
                  </span>
               </div>
               <span className="flex flex-row lg:m-0 my-1 lg:mt-[1px] lg:ml-[3px] px-3 md:px-4 lg:px-0 py-0 lg:pb-[2px] font-normal text-accent text-md sm:text-base lg:text-lg bg-black lg:bg-transparent rounded-full price">
                  {val}
                  <div className="pl-[0.125rem] tracking-wider">{unit}</div>
               </span>
            </div>
            <img src={`${item[bestPhoneId].img}-1.jpg`}
               className="hidden sm:block m-auto my-4 xl:my-5 max-h-20 lg:max-h-40 xl:max-h-52 object-contain"
            />
            <hr className="sm:hidden block m-1 mb-2 h-[2px] bg-gray-900" />
            <span className="flex flex-col justify-center p-0">
               <h1 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-all">{item[bestPhoneId].brand}</h1>
               <h1 className="font-medium md:text-md text-sm sm:text-base lg:text-lg transition-all">{item[bestPhoneId].name}</h1>
            </span>
            <div className="bottom-0 left-0 absolute w-full h-[3px] bg-accent"></div>
         </div>
      </NavLink>
   </>
}