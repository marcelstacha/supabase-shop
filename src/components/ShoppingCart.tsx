import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface ShoppingCartProps {
   length: number;
}

export default function ShoppingCart({ length }: ShoppingCartProps) {

   return (<>
      {(length > 0) &&
         <>
            {/* z-10 cart length white border*/}
            <span className="top-1/3 left-1/2 z-10 absolute py-0 text-xs border-solid -translate-x-1/2 -translate-y-1/2 length price">
               {length}
            </span>
            {/* z-20 cart length black number */}
            <span className="top-1/3 left-1/2 z-20 absolute py-0 font-bold text-gray-900 text-xs border-solid -translate-x-1/2 -translate-y-1/2 price">
               {length}
            </span>
         </>
      }
      <span className="flex items-center px-0 sm:px-2">
         <ShoppingCartIcon className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-gray-900 group-hover:text-yellow-600" />
      </span>
   </>)
}