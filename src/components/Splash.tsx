export default function Splash() {
   return (
      <>
         <div className="relative flex justify-center h-32 sm:h-52 md:h-60 lg:h-[19rem] 2xl:h-[28rem] xl:h-[24rem] align-middle">
            <img
               className="top-9 xl:top-16 left-4 sm:left-16 xl:left-36 absolute w-6 sm:w-8 xl:w-12 animate-spin"
               style={{ animationDuration: '7s' }}
               src="./star.svg">
            </img>
            <div className="z-20 relative m-auto w-[60%] sm:w-1/2 min-[480px]:w-[44%] font-semibold text-[#111827] text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-left text-wrap leading-none">
               <h2>Online-Shop für Smartphones & Foldables
                  <img
                     className="inline ml-1 xl:ml-5 p-0 sm:p-1 w-3 sm:w-6 md:w-8 lg:w-9 2xl:w-12 xl:w-11 drop-shadow-[0_0px_12px_rgba(255,255,255,0.75)] rotate-45"
                     src="./star.svg">
                  </img>
               </h2>
               <h6 className="pt-1 text-[0.7rem] sm:text-sm md:text-base leading-3">von Asus bis Xiaomi</h6>
            </div>
            <img
               className="top-4 absolute w-64 sm:w-96 md:w-[30rem] lg:w-[38rem] 2xl:w-[64rem] xl:w-[50rem] opacity-75"
               src="./line4.svg">
            </img>
            <img
               className="top-6 sm:top-12 md:top-12 lg:top-6 2xl:top-16 xl:top-10 right-7 sm:right-12 md:right-14 lg:right-12 2xl:right-20 xl:right-16 absolute w-8 sm:w-10 md:w-12 lg:w-16 2xl:w-28 xl:w-24 animate-spin"
               style={{ animationDuration: '13s' }}
               src="./star.svg">
            </img>

            {/*
            <img
               className="invisible xl:visible 2xl:top-80 xl:top-64 2xl:right-[21.5rem] xl:right-64 absolute w-4 sm:w-4 md:w-5 lg:w-6 2xl:w-8 xl:w-7 animate-spin"
               style={{ animationDuration: '9s' }}
               src="./star.svg">
            </img>
            */}
         </div>
      </>
   );
}
