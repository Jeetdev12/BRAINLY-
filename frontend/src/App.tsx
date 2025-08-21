

import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"





function App() {
 return(
     <BrowserRouter>
     <Routes>
        <Route path="/signup" element={<SignUp/>}  />
        <Route path="/signin" element={<SignIn/>}  />
        <Route path="/" element={<Dashboard/>}  />
     </Routes>
     </BrowserRouter>

  // <Dashboard/>
 )
}

export default App
