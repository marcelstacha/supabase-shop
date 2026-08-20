
export function clean(s: string | number): string {
   return s.toString().replace(".", ",")
}

export function formatPrice(num: number) {
   return (
      new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
         .format(num)
   )
}

export function formatDate(date: string, short?: boolean) {
   const year = short ? date.slice(2, 4) : date.slice(0, 4)
   const month = date.slice(5, 7)
   const day = date.slice(8, 10)
   const output = day + "." + month + "." + year

   return output
}
