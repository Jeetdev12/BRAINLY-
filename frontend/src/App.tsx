import { Button } from "./components/Button"
import { PlusIcon } from "./icons/PlusIcons"
import { ShareIcon } from "./icons/ShareIcon"


function App() {

  return (
    <div>
      <Button varient="Primary" text={"Add content"} startIcon={<PlusIcon/>}/>
      <Button varient="Secondary" text={"share"} startIcon={<ShareIcon/>}/>
    </div>
  )
}

export default App
