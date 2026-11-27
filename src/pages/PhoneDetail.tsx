import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartButton from "../components/ui/CartButton";
import HeartIcon from "../components/ui/HeartIcon";
import useCurrentPhone from "../hooks/useCurrentPhone";
import { clean, formatDate, formatNumber, formatPrice } from "../utils/utils";

import PhoneDetailTable from "../components/PhoneDetailTable";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function PhoneDetail() {
   const [imageToggle, setImageToggle] = useState(false);

   const navigate = useNavigate();
   const { id } = useParams();
   const { phone, isLoading } = useCurrentPhone(Number(id));

   const user = useAuthStore((state) => state.user);
   const addToCart = useCartStore((state) => state.addToCart);
   const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   useEffect(() => {
      fetchFavorites();
   }, [fetchFavorites, user]);

   function handleBack() {
      if (window.history.state && window.history.state.idx > 0) {
         navigate(-1);
      } else {
         navigate("/phonegrid");
      }
   }

   function handleAdd(id: number) {
      addToCart(id);
   }

   if (!phone) {
      return;
   }

   const specs = {
      screen: clean(phone.screen),
      soc: phone.soc,
      battery: formatNumber(phone.battery),
      charging: phone.charging,
      charging_wireless: phone.charging_wireless,
      fingerprint: phone.fingerprint,
      foldable: phone.foldable,
      weight: phone.weight,
      height: clean(phone.dimensions.height),
      width: clean(phone.dimensions.width),
      depth: clean(phone.dimensions.depth),
      release: formatDate(phone.release),
      price: formatPrice(phone.price),
   };

   return (
      <>
         {phone == null && isLoading == false ? (
            <div className="flex justify-center items-center m-auto min-h-96 font-bold text-xl sm:text-4xl">Produkt nicht gefunden</div>
         ) : phone ? (
            <>
               <motion.div
                  className="relative bg-white mt-4 rounded-xl phone-detail"
                  key={phone.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, backgroundColor: "white" }}
                  transition={{ duration: 0.45 }}
               >
                  <div className="flex justify-self-center mt-8 xl:mt-12 cursor-pointer" onClick={() => setImageToggle((pre) => !pre)}>
                     <img
                        alt={`${phone.brand} ${phone.name}, ${imageToggle ? "Vorderseite" : "Rückseite"}`}
                        src={`${phone.img}-${imageToggle ? "2" : "1"}.jpg`}
                        className="m-auto max-[400px]:pt-[1.2rem] h-[13rem] sm:h-[20rem] md:h-[25rem] object-contain aspect-square"
                     ></img>
                  </div>
                  <div className="flex flex-col md:gap-2 py-2 md:py-4 lg:py-6 sm:pt-4">
                     <div className="font-bold text-3xl sm:text-4xl md:text-5xl">{phone.brand}</div>
                     <div className="text-lg sm:text-2xl md:text-3xl">{phone.name}</div>
                  </div>
                  <div className="mx-6 sm:mx-8 md:mx-20 lg:mx-28 2xl:mx-60 sm:pt-2 pb-6 sm:pb-8">
                     <div>
                        <hr className="bg-gradient-to-r from-transparent via-gray-600 to-transparent m-auto h-[2px]" />
                        <h2 className="my-1 sm:my-2 md:my-4 font-sans font-semibold 2xl:text-[1.5rem] text-lg md:text-2xl text-center transition-all price">
                           {specs.price}
                        </h2>
                        <hr className="bg-gradient-to-r from-transparent via-gray-600 to-transparent m-auto mb-4 h-[2px]" />
                     </div>
                     {user && (
                        <div className="group top-4 right-4 absolute">
                           <HeartIcon isPreview={false} id={Number(id)} />
                        </div>
                     )}
                     <div className="group top-4 left-14 absolute" onClick={handleBack}>
                        <ArrowUturnLeftIcon className="sm:top-2 md:top-2 lg:top-3 right-4 sm:right-1 md:right-0 lg:-right-2 absolute w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 text-gray-900 group-hover:text-gray-600 transition cursor-pointer" />
                     </div>
                     <p className="p-0 text-[0.82rem] 2xl:text-[1.35rem] sm:text-base xl:text-xl text-justify 2xl:leading-7">
                        Das{" "}
                        <b>
                           {phone.brand} {phone.name}
                        </b>{" "}
                        ist ein {specs.foldable ? "faltbares" : ""} Smartphone mit einem {specs.screen}" großem Display. Es wird von dem{" "}
                        {specs.soc} angetrieben und verfügt über einen {specs.battery} mAh Akku. Das Gerät lässt sich kabelgebunden mit{" "}
                        {specs.charging} W
                        {specs.charging_wireless > 0 ? " und kabellos mit " + specs.charging_wireless + " W" : ", aber nicht kabellos"} aufladen.{" "}
                        {specs.fingerprint ? "Ein Fingerabdrucksensor ist integriert." : "Ein Fingerabdrucksensor ist nicht vorhanden."} Die
                        Abmessungen des Geräts betragen {specs.height} x {specs.width} x {specs.depth} mm - bei einem Gewicht von {specs.weight}{" "}
                        g. Das{" "}
                        <b>
                           {phone.brand} {phone.name}
                        </b>{" "}
                        wurde am {specs.release} vorgestellt.
                     </p>
                     <CartButton handleAdd={handleAdd} id={phone.id} big={true} />
                     <div className="table-container flex flex-col m-auto mt-2">
                        <PhoneDetailTable specs={specs} />
                     </div>
                  </div>
               </motion.div>
            </>
         ) : (
            <div className="flex justify-center items-center m-auto min-h-96 font-bold text-xl sm:text-4xl">Laden...</div>
         )}
      </>
   );
}
