
import { Button } from "./components/ui/Button"
import Card from "./components/ui/Card"
import CreateContentModal from "./components/ui/CreateContentModal"
import { Header } from "./components/ui/header"
import { PlusIcon } from "./icons/PlusIcons"
import { ShareIcon } from "./icons/ShareIcon"



function App() {

  return (
    <div className="min-h-screen p-4 ">
      {/* <Header/> */}
      <CreateContentModal open={true} closeModal={undefined} />
      <div className="flex items-center justify-end  gap-2">
        <Button varient="Primary" text={"Add content"} startIcon={<PlusIcon />} />
        <Button varient="Secondary" text={"Share Brain"} startIcon={<ShareIcon />} />

      </div>
      <div className="flex gap-4">
        <Card title="my first tweet " link="https://x.com/Kyunghoon_Kim_/status/1957013877113450561" type="twitter" />
        <Card title="my first video" link="https://www.youtube.com/watch?v=ymCpmq5F5PE" type="youtube" />
      </div>

    </div>
  )
}

export default App
