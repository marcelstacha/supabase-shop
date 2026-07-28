import PhoneProps from "./PhoneProps";

export default interface FavoritesProps extends Omit<PhoneProps, "id" | "created_at" | "release" | "foldable" | "dimensions" | "weight" | "description"> {
   id?: number;
   fav_id: number;
   fav_time: string;
   prod_id: number;
   user_id: string;
   prod_name?: string;
}