import { NavLink } from "react-router-dom";
import { clean, fill, formatDate } from "../utils/utils"
import PhoneProps from "../interfaces/PhoneProps";

export default function Row({ item }: { item: PhoneProps }) {

   return (<>
      <tr key={item.id} className="text-xs lg:text-base">
         <td className="pr-1 pl-1">
            <NavLink to={`/phonedetail/${item.id}`}>
               <img
                  className="w-6 h-6 object-contain hover:brightness-125 transition"
                  src={`${item.img}-1.jpg`}
                  alt={`${item.name}`}
               />
            </NavLink>
         </td>
         <td className="p-0">
            <div className="flex sm:flex-row flex-col sm:gap-1 px-1 leading-4 whitespace-nowrap">
               <span className="px-0 font-bold sm:text-base">{item.brand}</span>
               <span className="px-0 sm:text-base">{item.name}</span>
            </div>
         </td>
         <td className="">{fill(item.screen, 2)}"</td>
         <td className="">{item.soc}</td>
         <td className="text-center">{item.battery}mAh</td>
         <td className="text-end">{item.charging}W</td>
         <td className="text-center">{item.charging_wireless && item.charging_wireless > 0 ? item.charging_wireless + "W" : "❌"}</td>
         <td className="">{formatDate(item.release, true)}</td>
         <td className="">{item.weight}</td>
         <td className="text-center">{item.foldable ? "✅" : "❌"}</td>
         <td className="">{fill(item.dimensions.height, 1)}</td>
         <td className="">{fill(item.dimensions.width, 1)}</td>
         <td className="">{fill(item.dimensions.depth, 1)}</td>

         <td className="px-1 text-end">{clean(item.price)} €</td>

      </tr>
   </>)
}