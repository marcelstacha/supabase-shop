interface CartButtonProps {
   id: number;
   big?: boolean;
   handleAdd: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CartButton({ handleAdd, id, big = false }: CartButtonProps) {
   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      e.preventDefault();
      handleAdd(id, e);
   }

   return (
      <button
         type="button"
         onClick={handleClick}
         className={`${big ? "w-full px-4 py-3 text-xs my-3 sm:my-4 md:my-6" : "mt-2"} px-0 py-3 sm:py-3 text-xs sm:text-sm md:text-base xl:text-lg bg-accent md:bg-gray-50 md:hover:bg-accent hover:bg-accent border border-gray-900 rounded-[0.25rem] sm:rounded-lg duration-100`}
      >
         In den Warenkorb
      </button>
   );
}
