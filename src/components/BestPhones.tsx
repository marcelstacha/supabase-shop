import { useEffect, useState } from "react"
import PhoneProps from "../interfaces/PhoneProps"
import BestPhoneItem from "./BestPhoneItem"
import { motion } from "motion/react"

export default function BestPhones({ phones }: { phones: PhoneProps[] }) {

   const [battery, setBattery] = useState<PhoneProps>()
   const [biggest, setBiggest] = useState<PhoneProps>()
   const [smallest, setSmallest] = useState<PhoneProps>()
   const [lightest, setLightest] = useState<PhoneProps>()
   const [fastest, setFastest] = useState<PhoneProps>()
   const [thinnest, setThinnest] = useState<PhoneProps>()

   useEffect(() => {
      if (phones && phones.length > 0) {
         const { bat, big, sma, lig, fas, thi } = phones.reduce((acc, curr) => {
            if (curr.battery > acc.bat.battery) {
               acc.bat = curr
            }
            if (curr.screen > acc.big.screen) {
               acc.big = curr
            }
            if (curr.screen < acc.sma.screen && curr.screen > 0) {
               acc.sma = curr
            }
            if (curr.weight < acc.lig.weight && curr.weight > 0) {
               acc.lig = curr
            }
            if (curr.charging > acc.fas.charging) {
               acc.fas = curr
            }
            if (curr.dimensions.depth < acc.thi.dimensions.depth) {
               acc.thi = curr
            }
            return acc

         }, {
            bat: phones[0],
            big: phones[0],
            sma: phones[0],
            lig: phones[0],
            fas: phones[0],
            thi: phones[0]
         })
         setBattery(bat)
         setBiggest(big)
         setSmallest(sma)
         setLightest(lig)
         setFastest(fas)
         setThinnest(thi)
      }
   }, [phones])

   return (<>
      {phones && phones.length > 0 && <>

         <hr className="md:h-[3px] bg-gray-900 blockh-[2px]" />

         <div className="py-6 lg:py-12 font-bold text-base sm:text-lg lg:text-2xl">Empfehlungen</div>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className="gap-2 lg:gap-10 grid grid-cols-2"
         >

            <BestPhoneItem
               category={"battery"}
               item={battery}
            />
            <BestPhoneItem
               category={"fastest"}
               item={fastest}
            />
            <BestPhoneItem
               category={"biggest"}
               item={biggest}
            />
            <BestPhoneItem
               category={"smallest"}
               item={smallest}
            />
            <BestPhoneItem
               category={"lightest"}
               item={lightest}
            />
            <BestPhoneItem
               category={"thinnest"}
               item={thinnest}
            />

         </motion.div>
      </>}
   </>)
}