export default interface PhoneProps {
   id: number;
   created_at: string;
   release: string;
   name: string;
   brand: string;
   price: number;
   img: string;
   weight: number;
   foldable: boolean;
   fingerprint: boolean;
   soc: string;
   screen: number;
   charging: number;
   charging_wireless: number;
   description: string;
   battery: number;
   dimensions: {
      height: number,
      width: number,
      depth: number
   },
}