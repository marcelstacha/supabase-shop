import { useNavigate } from "react-router-dom"

export default function RedirectButton({ clickPath, text }: { clickPath: string, text: string[] }) {

   const navigate = useNavigate()

   function clickHandler() {
      navigate(`/${clickPath}`)
   }

   return (<>
      <div className="flex flex-col justify-center gap-3 px-4 pb-3">
         <span className="text-wrap">
            {text[0]}
         </span>
         <button
            onClick={clickHandler}
            className="big-button">
            {text[1]}
         </button>
      </div>
   </>)
}