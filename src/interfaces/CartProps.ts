import PhoneProps from "./PhoneProps";

export default interface CartProps extends Pick<PhoneProps,
   "brand" | "name" | "price" | "img"
> {
   id?: number;
   prod_id: number;
   user_id?: string;
}