import PhoneProps from "./PhoneProps";

export default interface FavoritesProps extends Pick<PhoneProps,
   "name" | "brand" | "price" | "img" | "soc" | "screen" | "charging" | "charging_wireless" | "fingerprint" | "battery"
> {
   id?: number;
   fav_id: number;
   fav_time: string;
   prod_id: number;
   user_id: string;
   prod_name?: string;
}