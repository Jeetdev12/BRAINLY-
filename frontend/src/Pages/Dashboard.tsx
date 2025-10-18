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
import UserIcon from "../icons/UserIcon"

export const Dashboard = () => {
  const [modelClose, setModelClose] = useState<any>(false)
  const [collection, setCollection] = useState<any>()
  const { contents, refresh } = useContent()
  const [isToken, setIsToken] = useState(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const navigate = useNavigate()
  // console.log("Contente", contents)
  const params = useParams()
  const { id } = params
  // console.log(params, id)


  useEffect(() => {
    refresh()
  }, [modelClose])

  useEffect(() => {
    setCollection(contents)
    console.log("contents", contents)
  }, [contents])

  useEffect(() => {
    const token:any = localStorage.getItem("token");
    
     token? setIsToken(true):''
    
  }, [])

  async function handleUserIconClick() {
    localStorage.removeItem("token")
    setIsToken(false)
    navigate("/signin")
  }
  const token = localStorage.getItem("token")

  async function handleSharedLink() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/brain/:${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    console.log("handleSharedLink", `${response.data}`)
  }

  useEffect(() => {
    if (id) {
      handleSharedLink()
    }

  }, [id])


  function handleClick(){
    setShowMenu((prev) => !prev)


  }

  async function handleShare() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (!response.data?.hash) {
      alert("No hash is received")
    }

    await navigator.clipboard.writeText(`${FRONTEND_URL}/${response?.data?.hash}`)
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
        <div className="flex items-center justify-between  gap-2">
          <h1 className="text-xl font-bold ">All Notes</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => { setModelClose(true) }} variant="Primary" text={"Add content"} startIcon={<PlusIcon />} />
            <Button onClick={handleShare} variant="Secondary" text={"Share Brain"} startIcon={<ShareIcon />} />

            {isToken ? <button onClick={handleClick} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-purple-400 to-purple-700"><UserIcon /></button> :<a href="/signin"> <button  className="flex size-10 cursor-pointer items-center justify-center rounded-sm bg-gradient-to-b from-purple-400 to-purple-700">Sign in </button></a>}
          </div>
        </div>
        {showMenu && <div onClick={handleClick } className="bg-white  absolute  mx-2 right-0 border-2 border-gray-400 w-32 overflow-hidden  duration-200">
          <button onClick={handleUserIconClick} className="mx-1 text-purple-600 semibold">Sign out</button>
        </div>}


        <div className="pt-4">
          {/* <Card key={1} title={"Mauj karenge"} link={"23333334"} type={"twitter"} /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {collection?.map((content: any, index: number) => (
              <Card key={content?._id || index} contentId={content?._id} title={content?.title} link={content.link} type={content.type} />

            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


