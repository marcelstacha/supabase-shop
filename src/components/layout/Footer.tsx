declare const __BUILD_DATE__: string;

export default function Footer() {

   return (<>
      <footer className="flex flex-col my-12 text-sm leading-3">
         <span>Version</span>
         <span>{__BUILD_DATE__}</span>
      </footer>
   </>)
}