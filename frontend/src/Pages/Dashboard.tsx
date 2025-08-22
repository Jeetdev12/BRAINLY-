import { useEffect, useState } from "react"
import { useContent } from "../hooks/useContent"
import SideBar from "../components/ui/Sidebar"
import CreateContentModal from "../components/ui/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcons"
import { Button } from "../components/ui/Button"
import { ShareIcon } from "../icons/ShareIcon"
import Card from "../components/ui/Card"




export const Dashboard = () => {
  const [modelClose, setModelClose] = useState<any>(false)
  const {contents,refresh} = useContent()
  console.log("Contente",contents)

  useEffect(()=>{
    refresh()
  },[modelClose])

  return (
    <div className="w-screen">
      <div className="fixed ">
        <SideBar />
      </div>
      <div className="min-h-screen p-4  ml-72 bg-gray-200">
        {/* <Header/> */}
        <CreateContentModal open={modelClose} closeModal={() => setModelClose(false)} />
        <div className="flex items-center justify-end  gap-2">
          <Button  onClick={() => { setModelClose(true) }} varient="Primary" text={"Add content"} startIcon={<PlusIcon />} />
          <Button varient="Secondary" text={"Share Brain"} startIcon={<ShareIcon />} />

        </div>
        <div className="flex gap-6 flex-wrap items-center justify-center pt-4">
          {contents?.map((content:any,index:number) => (
            <Card key={index} title={content?.title} link={content.link} type={content.type} />

          ))}

        </div>

      </div>
    </div>
  )
}