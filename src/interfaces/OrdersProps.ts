import PhoneProps from "./PhoneProps";

export default interface OrdersProps extends Pick<PhoneProps,
   "brand" | "name" | "price" | "img"
> {
   id: number;
   order_id: number;
   prod_id: number;
   user_id: string;
   created_at: string;
   prod_name?: string;
}