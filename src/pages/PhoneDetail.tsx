import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react"
import { formatDate, formatPrice } from "../utils/utils";
import useCurrentPhone from "../hooks/useCurrentPhone";
import CartButton from "../components/CartButton";
import Heart from "../components/Heart";
import PhoneDetailTable from "../components/PhoneDetailTable";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

export default function PhoneDetail() {

   const [isAnimating, setIsAnimating] = useState(false)
   const [imageToggle, setImageToggle] = useState(false)

   const navigate = useNavigate();
   const { id } = useParams()
   const { phone, isLoading } = useCurrentPhone(Number(id))

   const user = useAuthStore((state) => state.user)
   const addToCart = useCartStore((state) => state.addToCart)

   function handleAdd(id: number) {
      if (!isAnimating) {
         setIsAnimating(true)
         addToCart(id)
         setTimeout(() => {
            setIsAnimating(false)
         }, 1200)
      }
   }

   return (<>
      <AnimatePresence>
         {phone == null && isLoading == false ?
            <div className="flex justify-center items-center m-auto min-h-96 font-bold text-xl sm:text-4xl">
               Produkt nicht gefunden
            </div>
            : phone ? (
               <>
                  <motion.div
                     className="relative mt-4 bg-white rounded-xl phone-detail"
                     key={phone.id}
                     layout
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.75 }}
                  >
                     <motion.div
                        className="flex justify-self-center mt-8 xl:mt-16"
                        onHoverStart={() => setImageToggle(true)}
                        onHoverEnd={() => setImageToggle(false)}
                     >
                        <img src={`${phone.img}-${imageToggle ? "2" : "1"}.jpg`} className="m-auto h-[13rem] sm:h-[20rem] md:h-[25rem] 2xl:h-[32rem] object-contain aspect-square transition-all"></img>
                     </motion.div>
                     <div className="p-4">
                        <div className="font-bold text-3xl md:text-5xl">
                           {phone.brand}
                        </div>
                        <div className="text-lg md:text-3xl">
                           {phone.name}
                        </div>
                     </div>
                     <div className="mx-6 sm:mx-8 md:mx-20 lg:mx-28 2xl:mx-60 pt-2 pb-6 sm:pb-8">
                        <div>
                           <hr className="m-auto h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                           <h2 className="my-1 sm:my-2 md:my-4 font-sans font-semibold 2xl:text-[1.5rem] text-lg md:text-xl lg:text-2xl text-center transition-all price">
                              {formatPrice(phone.price)}
                           </h2>
                           <hr className="m-auto mb-4 h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                        </div>
                        {user &&
                           <div className="group top-4 right-4 absolute">
                              <Heart
                                 isPreview={false}
                                 id={Number(id)}
                              />
                           </div>
                        }
                        <div className="group top-4 left-14 absolute" onClick={() => navigate(-1)}>
                           <ArrowUturnLeftIcon
                              className="sm:top-2 md:top-2 lg:top-3 right-4 sm:right-1 md:right-0 lg:-right-2 absolute w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 text-gray-900 group-hover:text-gray-600 transition cursor-pointer"
                           />
                        </div>
                        <p className="p-0 text-[0.82rem] 2xl:text-[1.35rem] sm:text-base xl:text-xl text-justify 2xl:leading-7">
                           Das <b>{phone.brand} {phone.name}</b> ist ein {phone.foldable ? "faltbares" : ""} Smartphone mit einem {phone.screen}" großem Display. Es wird von dem {phone.soc} angetrieben
                           und verfügt über einen {phone.battery} mAh Akku. Das Gerät lässt sich kabelgebunden mit {phone.charging} W{phone.charging_wireless > 0 ?
                              " und kabellos mit " + phone.charging_wireless + " W" : ", aber nicht kabellos"} aufladen. {phone.fingerprint ? "Ein Fingerabdrucksensor ist integriert."
                                 : "Ein Fingerabdrucksensor ist nicht vorhanden."} Die Abmessungen des Geräts
                           betragen {phone.dimensions.height} x {phone.dimensions.width} x {phone.dimensions.depth} mm - bei einem Gewicht
                           von {phone.weight} g. Das <b>{phone.brand} {phone.name}</b> wurde
                           am {formatDate(phone.release)} vorgestellt.
                        </p>
                        <CartButton
                           isAnimating={isAnimating}
                           handleAdd={handleAdd}
                           id={phone.id}
                           big={true}
                        />
                        <div className="table-container flex flex-col m-auto mt-2">
                           <PhoneDetailTable phone={phone} />
                        </div>
                     </div>
                  </motion.div>
               </>
            ) : (
               <div className="flex justify-center items-center m-auto min-h-96 font-bold text-xl sm:text-4xl">Laden...</div>
            )}
      </AnimatePresence>
   </>)
}
