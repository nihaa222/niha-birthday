import BirthdayPage from "./pages/BirthdayPage"
import LandingPage from "./pages/LandingPage"
import { Routes, Route } from "react-router"


function App() {


  return (
    <>
      <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path="/:id" element={<BirthdayPage/>}/>
      </Routes>
       
    </>
  )
}

export default App
