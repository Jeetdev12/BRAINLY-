import { Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import SignIn from "./Pages/SignIn"
import { Dashboard } from "./Pages/Dashboard"
import { Home } from "./Pages/Home"

// ProtectedRoute.tsx
import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")
  if (!token) return <Navigate to="/signin" replace />
  return <>{children}</>
}

function App() {
 return(
     <Routes>
        <Route path="/signup" element={<SignUp/>}  />
        <Route path="/signin" element={<SignIn/>}  />
        <Route path="/" element={<Home/>}  />
        <Route path="/:id" element={  
         <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      // <Dashboard/>
      }  
      />
     </Routes>

  // <Dashboard/>
 )
}

export default App
