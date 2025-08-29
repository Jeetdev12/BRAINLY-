import { PlusIcon } from "../../icons/PlusIcons"
import { ShareIcon } from "../../icons/ShareIcon"
import { Button } from "./Button"



export const Header = () => {
    return (
        <header className="sticky top-0 z-50  w-full border-b bg-gray-600 ">
            <div className="flex">
                <span className="text-2xl font-bold">BRAINLY</span>
                <div className="flex items-center justify-center px-10">
                <Button variant="Primary" text={"Share"} startIcon={<ShareIcon/>}/>
                <Button variant="Secondary" text={"Add content"} startIcon={<PlusIcon />}/>
                </div>
            </div>

        </header>
    )
}