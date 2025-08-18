import CrossIcon from "../../icons/CrossIcon";
import { Button } from "./Button";


export default function CreateContentModal({ open, closeModal }) {


    return (
        <div>
            {open && <div className="min-h-screen min-w-screen top-0 left-0 fixed bg-slate-300 opacity-60 flex items-center justify-center">
                 <div className="flex flex-cols justify-center p-4">
                     <span className=" opacity-100 bg-white">
                        <div className="flex justify-end">
                            <div onClick={closeModal} className="cursor-pointer">
<CrossIcon/>
                            </div>
                            
                        </div>
                        <div>
                            <Input placeholder={"title"}/>
                            <Input placeholder={"link"}/>
                        </div>
                        <div className="flex justify-center">
                            <Button text={"add content"} varient="Primary"/>
                        </div>
                     </span>
                    </div> 
            </div>}
        </div>
    )
}


function Input({onChange,placeholder}:{onChange:()=>void}){
    return (
        <div> 
            <input type="text" className="px-4 py-2 border rounded m-2"  onChange={onchange} placeholder={placeholder}>
            </input>
        </div>
    )
}