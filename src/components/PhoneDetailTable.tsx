interface PhoneSpecs {
   screen: string;
   soc: string;
   battery: string;
   charging: number;
   charging_wireless: number;
   fingerprint: boolean;
   foldable: boolean;
   weight: number;
   height: string;
   width: string;
   depth: string;
   release: string;
   price: string;
}

export default function PhoneDetailTable({ specs }: { specs: PhoneSpecs }) {
   return (
      <>
         <table className="table-custom border text-[0.5rem] min-[350px]:text-[0.615rem] min-[440px]:text-xs sm:text-base xl:text-lg border-collapse table-auto price">
            <tbody className="">
               <tr>
                  <td>Bildschirm</td>
                  <td>{specs.screen}"</td>
               </tr>
               <tr>
                  <td>SoC</td>
                  <td>{specs.soc}</td>
               </tr>
               <tr>
                  <td>Akku</td>
                  <td>{specs.battery} mAh</td>
               </tr>
               <tr>
                  <td>Aufladen</td>
                  <td>{specs.charging} W</td>
               </tr>
               <tr>
                  <td>(Kabellos)</td>
                  <td>{specs.charging_wireless == 0 || specs.charging_wireless == null ? "❌" : specs.charging_wireless + " W"}</td>
               </tr>
               <tr>
                  <td>Fingerabdruck</td>
                  <td>{specs.fingerprint ? "✅" : "❌"}</td>
               </tr>
               <tr>
                  <td>Faltbar</td>
                  <td>{specs.foldable ? "✅" : "❌"}</td>
               </tr>
               <tr>
                  <td>Gewicht</td>
                  <td>{specs.weight} g</td>
               </tr>
               <tr>
                  <td>Maße</td>
                  <td>
                     {specs.height} x {specs.width} x {specs.depth} mm
                  </td>
               </tr>
               <tr className="bg-gray-900 font-light text-white">
                  <td>Vorgestellt</td>
                  <td className="text">{specs.release}</td>
               </tr>
            </tbody>
         </table>
      </>
   );
}
