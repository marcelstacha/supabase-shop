import PhoneProps from "../interfaces/PhoneProps";
import { clean, formatDate } from "../utils/utils";

export default function PhoneDetailTable({ phone }: { phone: PhoneProps }) {

   return (<>
      <table className="table-custom text-[0.7rem] sm:text-base lg:text-lg border border-collapse table-auto price">
         <tbody className="">
            <tr>
               <td>Bildschirm</td>
               <td>{phone.screen}"</td>
            </tr>
            <tr>
               <td>SoC</td>
               <td>{phone.soc}</td>
            </tr>
            <tr>
               <td>Akku</td>
               <td>{phone.battery} mAh</td>
            </tr>
            <tr>
               <td>Aufladen</td>
               <td>{phone.charging} W</td>
            </tr>
            <tr>
               <td>(Kabellos)</td>
               <td>{phone.charging_wireless == 0 || phone.charging_wireless == null ? "❌" : phone.charging_wireless + " W"}</td>
            </tr>
            <tr>
               <td>Fingerabdruck</td>
               <td>{phone.fingerprint ? "✅" : "❌"}</td>
            </tr>
            <tr>
               <td>Faltbar</td>
               <td>{phone.foldable ? "✅" : "❌"}</td>
            </tr>
            <tr>
               <td>Gewicht</td>
               <td>{phone.weight} g</td>
            </tr>
            <tr>
               <td>Maße</td>
               <td>{clean(phone.dimensions.height)} x {clean(phone.dimensions.width)} x {clean(phone.dimensions.depth)} mm</td>
            </tr>
            <tr className="font-light text-white bg-gray-900">
               <td>
                  Veröffentlicht
               </td>
               <td className="text">
                  {formatDate(phone.release)}
               </td>
            </tr>
         </tbody>
      </table>
   </>)
}