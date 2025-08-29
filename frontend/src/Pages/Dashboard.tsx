import { useEffect, useState } from "react"
import { useContent } from "../hooks/useContent"
import SideBar from "../components/ui/Sidebar"
import CreateContentModal from "../components/ui/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcons"
import { Button } from "../components/ui/Button"
import { ShareIcon } from "../icons/ShareIcon"
import Card from "../components/ui/Card"
import axios from "axios"
import { BACKEND_URL, FRONTEND_URL } from "../utilis/config"
import { useNavigate, useParams } from "react-router-dom"

export const Dashboard = () => {
  const [modelClose, setModelClose] = useState<any>(false)
  const [collection, setCollection] = useState<any>()
  const { contents, refresh } = useContent()
  const navigate = useNavigate()
  console.log("Contente", contents)
  const params = useParams()
  const { id } = params
  console.log(params, id)

  useEffect(() => {
    refresh()
  }, [modelClose])

  useEffect(() => {
    setCollection(contents)
  }, [contents])

  useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token)(
           navigate("/signup") 
        )
  },[])

  async function handleSharedLink() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/brain/:${id}`,
      {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })

    console.log("handleSharedLink", `${response.data}`)
  }

  useEffect(() => {
    if (id) {
      handleSharedLink()
    }

  }, [id])


  async function handleShare() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    },
      {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })

  await  navigator.clipboard.writeText(`${FRONTEND_URL}/${response.data.hash}`)
    alert(`link copied : ${FRONTEND_URL}/${response.data.hash}`)


  }

  return (
    <div className="w-screen">
      <div className="fixed ">
        <SideBar />
      </div>
      <div className="min-h-screen p-4 ml-48 md:ml-62 bg-gray-100">
        {/* <Header/> */}
        <CreateContentModal open={modelClose} closeModal={() => setModelClose(false)} />
        <div className="flex items-center justify-end  gap-2">
          <Button onClick={() => { setModelClose(true) }} variant="Primary" text={"Add content"} startIcon={<PlusIcon />} />
          <Button onClick={handleShare} variant="Secondary" text={"Share Brain"} startIcon={<ShareIcon />} />



        </div>
        <div className="   pt-4">
          {/* <Card key={1} title={"Mauj karenge"} link={"23333334"} type={"twitter"} /> */}
          <div className=" flex flex-wrap mt-2  gap-3">
            {collection?.map((content: any, index: number) => (
              <Card key={content?._id || index} contentId={content?._id} title={content?.title} link={content.link} type={content.type} />

            ))}
          </div>
        </div>

      </div>
    </div>
  )
}