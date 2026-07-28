import PhoneProps from "./PhoneProps";

export default interface CartProps extends Omit<PhoneProps, "id" | "created_at" | "release" | "foldable" | "dimensions"> {
   id?: number;
   prod_id: number;
   user_id?: string;
}