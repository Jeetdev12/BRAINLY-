import CrossIcon from "../../icons/CrossIcon";


export default function CreateContentModal({ open, closeModal }) {


    return (
        <div>
            {open && <div className="min-h-screen min-w-screen top-0 left-0 fixed bg-slate-300 opacity-60 flex items-center justify-center">
                 <div className="flex flex-cols justify-center p-4">
                     <span className=" opacity-100 bg-white">
                        <div className="flex justify-end">
                            <CrossIcon/>
                        </div>
                     </span>
                    </div> 
            </div>}
        </div>
    )
}