import PhoneProps from "../interfaces/PhoneProps"
import BestPhoneItem from "./BestPhoneItem"
import { motion } from "motion/react"

export default function BestPhones({ phones }: { phones: PhoneProps[] }) {

   if (!phones || phones.length == 0) {
      return null
   }

   /* ganze phone objekte, statt number für BestPhoneItem */
   let largestBattery = [phones[0]]
   let biggestScreen = [phones[0]]
   let smallestScreen = [phones[0]]
   let lightestWeight = [phones[0]]
   let fastestCharging = [phones[0]]
   let thinnestBody = [phones[0]]

   phones.forEach((item, index) => {
      if (index == 0) return

      if (item.battery > largestBattery[0].battery) {
         largestBattery = [item]
      } else if (item.battery == largestBattery[0].battery) {
         largestBattery.push(item)
      }

      if (item.screen > biggestScreen[0].screen) {
         biggestScreen = [item]
      } else if (item.screen == biggestScreen[0].screen) {
         biggestScreen.push(item)
      }

      if (item.screen < smallestScreen[0].screen) {
         smallestScreen = [item]
      } else if (item.screen == smallestScreen[0].screen) {
         smallestScreen.push(item)
      }

      if (item.weight < lightestWeight[0].weight) {
         lightestWeight = [item]
      } else if (item.weight == lightestWeight[0].weight) {
         lightestWeight.push(item)
      }

      if (item.charging > fastestCharging[0].charging) {
         fastestCharging = [item]
      } else if (item.charging == fastestCharging[0].charging) {
         fastestCharging.push(item)
      }

      if (item.dimensions.depth < thinnestBody[0].dimensions.depth) {
         thinnestBody = [item]
      } else if (item.dimensions.depth == thinnestBody[0].dimensions.depth) {
         thinnestBody.push(item)
      }


   })


   return (<>

      <hr className="md:h-[3px] bg-gray-900 blockh-[2px]" />

      <div className="py-6 lg:py-10 font-bold text-base sm:text-lg lg:text-2xl">Empfehlungen</div>

      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.75 }}
         className="gap-2 lg:gap-10 xl:gap-5 grid grid-cols-2 2xl:grid-cols-3"
      >

         <BestPhoneItem
            category={"battery"}
            item={largestBattery}
         />
         <BestPhoneItem
            category={"fastest"}
            item={fastestCharging}
         />
         <BestPhoneItem
            category={"biggest"}
            item={biggestScreen}
         />
         <BestPhoneItem
            category={"smallest"}
            item={smallestScreen}
         />
         <BestPhoneItem
            category={"lightest"}
            item={lightestWeight}
         />
         <BestPhoneItem
            category={"thinnest"}
            item={thinnestBody}
         />

      </motion.div>

   </>)
}