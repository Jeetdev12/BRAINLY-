

import { Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"





function App() {
 return(
     <Routes>
        <Route path="/signup" element={<SignUp/>}  />
        <Route path="/signin" element={<SignIn/>}  />
        <Route path="/" element={<Dashboard/>}  />
        <Route path="/:id" element={<Dashboard/>}  />
     </Routes>

  // <Dashboard/>
 )
}

export default App
